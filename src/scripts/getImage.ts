const images = import.meta.glob<{ default: ImageMetadata }>('../images/*.*', { eager: true });

export function getImage(path: string) {
	const filename = path.split('/').pop()!;
	const match = Object.entries(images).find(([key]) => key.endsWith(filename));
	if (match) {
		console.log(`[getImage] Found: ${filename}`);
	} else {
		console.warn(`[getImage] Missing: ${filename} (path: ${path})`);
	}
	return match ? match[1].default : undefined;
}
