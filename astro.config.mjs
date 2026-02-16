import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
    experimental: {
        fonts: [{
            provider: fontProviders.google(),
            name: "Roboto",
            cssVariable: "--font-roboto"
        },
        {
            provider: fontProviders.google(),
            name: "JetBrains Mono",
            cssVariable:"--font-jetbrains-mono"
        }
    ]
    },
    site: 'https://angelo-j.com'
});