/**
 * RGB Store - API Service
 * Connects React Frontend with Laravel Backend REST API
 * Base URL: http://127.0.0.1:8000/api
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Fetch all products from Laravel API
 * @param {number|null} categoryId - Optional category ID to filter by
 */
export async function getProducts(categoryId = null) {
  try {
    const url = categoryId
      ? `${API_BASE_URL}/products?category_id=${categoryId}`
      : `${API_BASE_URL}/products`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      // Normalize product structure to match frontend expectations
      return result.data.map((item) => ({
        id: item.id,
        name: item.name,
        khmerName: item.khmer_name || item.name,
        price: parseFloat(item.price),
        category: item.category ? item.category.name : (item.category || 'General'),
        categoryId: item.category_id || (item.category ? item.category.id : null),
        image: item.image || 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
        description: item.description || '',
        rating: parseFloat(item.rating || 4.5),
        reviews: item.reviews || 80,
        badge: item.badge || 'Popular',
        stock: item.stock ?? 10,
      }));
    }

    return [];
  } catch (error) {
    console.warn('[API Service] Failed to fetch products from Laravel API:', error.message);
    throw error;
  }
}

/**
 * Fetch all categories from Laravel API
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.warn('[API Service] Failed to fetch categories from Laravel API:', error.message);
    throw error;
  }
}

/**
 * Check if Laravel Backend API is reachable
 */
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });
    return response.ok;
  } catch {
    return false;
  }
}
