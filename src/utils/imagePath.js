// Helper function to get the correct image path with base URL
export const getImagePath = (path) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Get base URL from Vite's environment variable
    // In production (GitHub Pages), this will be '/omikuji/'
    // In development, this will be '/'
    const baseUrl = import.meta.env.BASE_URL;

    // Ensure base URL ends with slash
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    return `${normalizedBase}${cleanPath}`;
};
