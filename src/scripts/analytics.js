
    (function () {
  'use strict';

  const config = {
    endpoint: '',
    enableVitals: true,
    enableErrors: true,
    sampleRate: 1.0,
    debug: true,
    respectConsent: false, // ensures users cookie gets saved
    detectBots: true
  };

  let initialized = false;
  let blocked = false;          
  const customData = {};         
  let userId = null;             
  const plugins = [];
  const reportedErrors = new Set();
  let errorCount = 0;
  const MAX_ERRORS = 10;

  const vitals = { lcp: null, cls: 0, inp: null };

  let pageShowTime = Date.now();
  let totalVisibleTime = 0;

  /**
   * Round a number to two decimal places.
   */
  function round(n) {
    return Math.round(n * 100) / 100;
  }

  /**
   * Merge properties from src into dst (shallow).
   */
  function merge(dst, src) {
    for (const key of Object.keys(src)) {
      dst[key] = src[key];
    }
    return dst;
  }


  /**
   * Check whether the user has granted analytics consent.
   * Returns false if Global Privacy Control is set or if the
   * analytics_consent cookie is absent or set to 'false'.
   */
  function hasConsent() {
    // Check Global Privacy Control
    if (navigator.globalPrivacyControl) {
      return false;
    }

    // Check consent cookie
    const cookies = document.cookie.split(';');
    for (const c of cookies) {
      const cookie = c.trim();
      if (cookie.indexOf('analytics_consent=') === 0) {
        console.log('found analytics consent cookie');
        return cookie.split('=')[1] === 'true';
      }
    }

    return false;
  }

  function isBot() {
    // WebDriver flag (Puppeteer, Selenium, Playwright)
    if (navigator.webdriver) return true;

    // Headless browser indicators in user agent
    const ua = navigator.userAgent;
    if (/HeadlessChrome|PhantomJS|Lighthouse/i.test(ua)) return true;

    // Chrome UA without window.chrome object
    if (/Chrome/.test(ua) && !window.chrome) return true;

    // Automation framework globals
    if (window._phantom || window.__nightmare || window.callPhantom) return true;

    return false;
  }

  function isSampled() {
    if (config.sampleRate >= 1.0) return true;
    if (config.sampleRate <= 0) return false;

    const key = '_collector_sample';
    let val = sessionStorage.getItem(key);
    if (val === null) {
      val = Math.random();
      sessionStorage.setItem(key, val);
    } else {
      val = parseFloat(val);
    }
    return val < config.sampleRate;
  }

  function getSessionId() {
    let sid = sessionStorage.getItem('_collector_sid');
    if (!sid) {
      sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem('_collector_sid', sid);
    }
    // also writes as a cookie so apache can see it, we can add the cookie containing the collector_sid to the log
    document.cookie = `_collector_sid=${sid}; path=/; SameSite=Lax`;
    return sid;
  }

  function getNetworkInfo() {
    if (!('connection' in navigator)) return {};
    const conn = navigator.connection;
    return {
      effectiveType: conn.effectiveType,
      downlink: conn.downlink,
      rtt: conn.rtt,
      saveData: conn.saveData
    };
  }

  function getTechnographics() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      pixelRatio: window.devicePixelRatio,
      cores: navigator.hardwareConcurrency || 0,
      memory: navigator.deviceMemory || 0,
      network: getNetworkInfo(),
      colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  function getNavigationTiming() {
    const entries = performance.getEntriesByType('navigation');
    if (!entries.length) return {};
    const n = entries[0];
    return {
      dnsLookup: round(n.domainLookupEnd - n.domainLookupStart),
      tcpConnect: round(n.connectEnd - n.connectStart),
      tlsHandshake: n.secureConnectionStart > 0 ? round(n.connectEnd - n.secureConnectionStart) : 0,
      ttfb: round(n.responseStart - n.requestStart),
      download: round(n.responseEnd - n.responseStart),
      domInteractive: round(n.domInteractive - n.fetchStart),
      domComplete: round(n.domComplete - n.fetchStart),
      loadEvent: round(n.loadEventEnd - n.fetchStart),
      fetchTime: round(n.responseEnd - n.fetchStart),
      transferSize: n.transferSize,
      headerSize: n.transferSize - n.encodedBodySize
    };
  }

  function getResourceSummary() {
    const resources = performance.getEntriesByType('resource');
    const summary = {
      script:         { count: 0, totalSize: 0, totalDuration: 0 },
      link:           { count: 0, totalSize: 0, totalDuration: 0 },
      img:            { count: 0, totalSize: 0, totalDuration: 0 },
      font:           { count: 0, totalSize: 0, totalDuration: 0 },
      fetch:          { count: 0, totalSize: 0, totalDuration: 0 },
      xmlhttprequest: { count: 0, totalSize: 0, totalDuration: 0 },
      other:          { count: 0, totalSize: 0, totalDuration: 0 }
    };
    resources.forEach((r) => {
      const type = summary[r.initiatorType] ? r.initiatorType : 'other';
      summary[type].count++;
      summary[type].totalSize += r.transferSize || 0;
      summary[type].totalDuration += r.duration || 0;
    });
    return { totalResources: resources.length, byType: summary };
  }

  function initWebVitals() {
    console.log('[Analytics] Initializing Web Vitals tracking...');
    // Largest Contentful Paint
    try {
      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length) {
          vitals.lcp = round(entries[entries.length - 1].startTime);
          console.log('[Analytics] LCP recorded:', vitals.lcp, 'ms');
        }
      });
      lcpObs.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) { /* LCP not supported */ }

    // Cumulative Layout Shift
    try {
      const clsObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            vitals.cls = round(vitals.cls + entry.value);
          }
        });
      });
      clsObs.observe({ type: 'layout-shift', buffered: true });
      console.log('[Analytics] CLS observer active');
    } catch (e) { /* CLS not supported */ }

    // Interaction to Next Paint
    try {
      const inpObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (vitals.inp === null || entry.duration > vitals.inp) {
            vitals.inp = round(entry.duration);
          }
        });
      });
      inpObs.observe({ type: 'event', buffered: true, durationThreshold: 16 });
      console.log('[Analytics] INP observer active');
    } catch (e) { /* INP not supported */ }
  }

  function getWebVitals() {
    return { lcp: vitals.lcp, cls: vitals.cls, inp: vitals.inp };
  }

  function reportError(errorData) {
    if (errorCount >= MAX_ERRORS) return;

    const key = `${errorData.type}:${errorData.message || ''}:${errorData.source || ''}:${errorData.line || ''}`;
    if (reportedErrors.has(key)) return;
    reportedErrors.add(key);
    errorCount++;

    send({
      type: 'error',
      error: errorData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      session: getSessionId()
    });

    window.dispatchEvent(new CustomEvent('collector:error', {
      detail: { errorData: errorData, count: errorCount }
    }));
  }

  function initErrorTracking() {
    console.log('[Analytics] Error tracking enabled');
    window.addEventListener('error', (event) => {
      if (event instanceof ErrorEvent) {
        reportError({
          type: 'js-error',
          message: event.message,
          source: event.filename,
          line: event.lineno,
          column: event.colno,
          stack: event.error ? event.error.stack : '',
          url: window.location.href
        });
      } else {
        const target = event.target;
        if (target && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
          reportError({
            type: 'resource-error',
            tagName: target.tagName,
            src: target.src || target.href || '',
            url: window.location.href
          });
        }
      }
    }, true);

    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      reportError({
        type: 'promise-rejection',
        message: reason instanceof Error ? reason.message : String(reason),
        stack: reason instanceof Error ? reason.stack : '',
        url: window.location.href
      });
    });
  }

  function queueForRetry(payload) {
    try {
      const queue = JSON.parse(sessionStorage.getItem('_collector_retry') || '[]');
      if (queue.length >= 50) return;
      queue.push(payload);
      sessionStorage.setItem('_collector_retry', JSON.stringify(queue));
    } catch (e) { /* sessionStorage unavailable or full */ }
  }

  function processRetryQueue() {
    try {
      const queue = JSON.parse(sessionStorage.getItem('_collector_retry') || '[]');
      if (!queue.length) return;
      sessionStorage.removeItem('_collector_retry');
      queue.forEach((payload) => { send(payload); });
    } catch (e) { /* sessionStorage unavailable */ }
  }

  function send(payload) {
    // Self-measurement
    const markSupported = typeof performance.mark === 'function';
    if (markSupported) {
      performance.mark('collector_send_start');
    }

    // Debug mode: log instead of sending
    if (config.debug) {
      console.log('[Collector] Debug payload:', payload);
      return;
    }

    if (!config.endpoint) {
      console.warn('[Collector] No endpoint configured');
      return;
    }

    const json = JSON.stringify(payload);
    let sent = false;

    // Try sendBeacon first
    if (navigator.sendBeacon) {
      sent = navigator.sendBeacon(
        config.endpoint,
        new Blob([json], { type: 'application/json' })
      );
    }

    // Fallback to fetch with keepalive
    if (!sent) {
      fetch(config.endpoint, {
        method: 'POST',
        body: json,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      }).catch(() => {
        queueForRetry(payload);
      });
    }

    // Self-measurement
    if (markSupported) {
      performance.mark('collector_send_end');
      performance.measure('collector_send', 'collector_send_start', 'collector_send_end');
    }

    // Notify listeners (for test pages)
    window.dispatchEvent(new CustomEvent('collector:beacon', { detail: payload }));
  }

  function collect(type) {
    console.log('[Analytics] Collecting:', type);
    let payload = {
      type: type || 'pageview',
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      session: getSessionId(),
      technographics: getTechnographics(),
      timing: getNavigationTiming(),
      resources: getResourceSummary(),
      vitals: getWebVitals(),
      errorCount: errorCount,
      customData: customData
    };

    if (userId) {
      payload.userId = userId;
    }

    // Let plugins augment the payload
    plugins.forEach((plugin) => {
      if (typeof plugin.beforeSend === 'function') {
        const result = plugin.beforeSend(payload);
        if (result === false) return; // Plugin can suppress the beacon
        if (result && typeof result === 'object') {
          payload = result;
        }
      }
    });

    send(payload);

    window.dispatchEvent(new CustomEvent('collector:payload', { detail: payload }));
  }

  function initTimeOnPage() {
    console.log('[Analytics] Time-on-page tracking enabled');
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        totalVisibleTime += Date.now() - pageShowTime;

        // Send exit beacon with time-on-page
        const exitPayload = {
          type: 'page_exit',
          url: window.location.href,
          timeOnPage: totalVisibleTime,
          vitals: getWebVitals(),
          errorCount: errorCount,
          timestamp: new Date().toISOString(),
          session: getSessionId()
        };

        // Let plugins flush on exit
        plugins.forEach((plugin) => {
          if (typeof plugin.onExit === 'function') {
            plugin.onExit(exitPayload);
          }
        });

        send(exitPayload);
      } else {
        // Page became visible again â€” reset the timer
        pageShowTime = Date.now();
      }
    });
  }

  function processQueue() {
    const queue = window._cq || [];
    for (const args of queue) {
      const method = args[0];
      const params = args.slice(1);
      if (typeof publicAPI[method] === 'function') {
        publicAPI[method](...params);
      }
    }
    // Replace array with live proxy
    window._cq = {
      push: (args) => {
        const method = args[0];
        const params = args.slice(1);
        if (typeof publicAPI[method] === 'function') {
          publicAPI[method](...params);
        }
      }
    };
  }

  const publicAPI = {
    /**
     * Initialize the collector with the given options.
     * Checks consent, bot detection, and sampling gates.
     */
    init: function (options) {
      if (initialized) {
        console.warn('[Collector] Already initialized');
        return;
      }

      // Self-measurement: initialization timing
      if (typeof performance.mark === 'function') {
        performance.mark('collector_init_start');
      }

      // Merge user options into config
      if (options) merge(config, options);

      if (config.respectConsent && !hasConsent()) {
        console.log('[Collector] No consent â€” collection disabled!!!');
        blocked = true;
        initialized = true;
        return;
      }

      // Gate 2: Bot detection
      if (config.detectBots && isBot()) {
        console.log('[Collector] Bot detected â€” collection disabled');
        blocked = true;
        initialized = true;
        return;
      }

      // Gate 3: Sampling
      if (!isSampled()) {
        console.log(`[Collector] Session not sampled (rate: ${config.sampleRate})`);
        blocked = true;
        initialized = true;
        return;
      }

      initialized = true;
      console.log('[Collector] Initialized', config);

      // Start subsystems
      if (config.enableVitals) initWebVitals();
      if (config.enableErrors) initErrorTracking();
      initTimeOnPage();

      // Process retry queue from previous page
      processRetryQueue();

      // Collect pageview after the page is fully loaded
      if (document.readyState === 'complete') {
        setTimeout(() => { collect('pageview'); }, 0);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => { collect('pageview'); }, 0);
        });
      }

      // Self-measurement
      if (typeof performance.mark === 'function') {
        performance.mark('collector_init_end');
        performance.measure('collector_init', 'collector_init_start', 'collector_init_end');
      }
    },

    /**
     * Track a custom event.
     */
    track: function (eventName, eventData) {
      if (!initialized || blocked) {
        console.log('not initialized! or blocked');
        return;
      }
      const payload = {
        type: 'event',
        event: eventName,
        data: eventData || {},
        timestamp: new Date().toISOString(),
        url: window.location.href,
        session: getSessionId(),
        customData: customData
      };
      if (userId) payload.userId = userId;
      send(payload);
    },

    /**
     * Set a custom key-value pair on all subsequent payloads.
     */
    set: function (key, value) {
      customData[key] = value;
    },

    /**
     * Identify the current user.
     */
    identify: function (id) {
      userId = id;
    },

    use: function (plugin) {
      if (!plugin || typeof plugin !== 'object') {
        console.warn('[Collector] Invalid plugin');
        return;
      }
      plugins.push(plugin);
      if (typeof plugin.init === 'function') {
        plugin.init(config);
      }
      console.log(`[Collector] Plugin registered: ${plugin.name || '(unnamed)'}`);
    }
  };

  processQueue();

  // Auto-initialize in debug mode
  console.log('[Analytics] Script loaded');
  publicAPI.init();

  window.__collector = {
    getNavigationTiming: getNavigationTiming,
    getResourceSummary: getResourceSummary,
    getTechnographics: getTechnographics,
    getWebVitals: getWebVitals,
    getSessionId: getSessionId,
    getNetworkInfo: getNetworkInfo,
    reportError: reportError,
    collect: collect,
    hasConsent: hasConsent,
    isBot: isBot,
    isSampled: isSampled,
    getErrorCount: () => errorCount,
    getConfig: () => config,
    isBlocked: () => blocked,
    api: publicAPI
  };

})();
