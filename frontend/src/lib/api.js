import api from './axios'

// user apis
export const syncUser = async (userData) => {
    const { data } = await api.post("/user/sync", userData)
    return data;
}

// product apis

export const getAllProducts = async () => {
    const { data } = await axios.get("/products")
    return data;
}

export const getProductById = async (id) => {
    const { data } = await axios.get(`/products/${id}`)
    return data;
}

export const getMyProducts = async () => {
    const { data } = await api.get("/products/my");
    return data;
};

export const createProduct = async (productData) => {
    const { data } = await api.post("/products", productData);
    return data;
};

export const updateProduct = async ({ id, ...productData }) => {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
}

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
};

// comment apis

export const createComment = async ({ productId, content }) => {
    const { data } = await api.post(`/comments/${productId}`, { content });
    return data;
};

export const deleteComment = async ({ commentId }) => {
    const { data } = await api.delete(`/comments/${commentId}`);
    return data;
};