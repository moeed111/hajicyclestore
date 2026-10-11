const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const productApi = {
  // Admin Login API
  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Invalid username or password.');
    }
    return response.json();
  },

  // Get all products or filter by category / search
  async getProducts(category, search) {
    const params = new URLSearchParams();
    if (category && category !== 'All') {
      params.append('category', category);
    }
    if (search && search.trim()) {
      params.append('search', search.trim());
    }

    const queryString = params.toString();
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
  },

  // Get product by id
  async getProductById(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  },

  // Create new product
  async createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  // Update product
  async updateProduct(id, productData) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  // Delete product
  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return response.json();
  },

  // Update stock status or quantity
  async updateStock(id, inStock, stockQuantity) {
    const response = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inStock, stockQuantity }),
    });
    if (!response.ok) {
      throw new Error('Failed to update stock');
    }
    return response.json();
  },

  // Get inventory stats
  async getStats() {
    const response = await fetch(`${API_BASE_URL}/products/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return response.json();
  },

  // Upload image
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    const result = await response.json();
    // Prepend API_BASE_URL if it's a relative path (/uploads/...)
    if (result.url && result.url.startsWith('/uploads/')) {
      return `http://localhost:8080${result.url}`;
    }
    return result.url;
  },

  // Get all categories list
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      return [
        'Cycle',
        'Ranger cycle',
        'Kids cycle',
        'Ladies cycle',
        'Cycle tubes',
        'Cycle parts',
        'Tubes for bikes and other vehicles',
        'Tyres for bikes and other vehicles',
      ];
    }
    return response.json();
  },
};
