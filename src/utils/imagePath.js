// Helper function to get the correct image path with base URL
export const getImagePath = (path) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Use Vite's BASE_URL environment variable
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
