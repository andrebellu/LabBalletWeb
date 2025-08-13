export const load = async ({ url, fetch }) => {
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = 10;

    try {
        const response = await fetch('/api/images');
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Failed to fetch images');

        const allImages = data.images || [];
        const paginatedImages = allImages.slice((page - 1) * limit, page * limit);
        const totalPages = Math.ceil(allImages.length / limit);

        return {
            images: paginatedImages,
            currentPage: page,
            totalPages
        };
    } catch (error) {
        console.error('Error loading images:', error);
        return {
            images: [],
            currentPage: 1,
            totalPages: 1,
            error: error.message
        };
    }
};