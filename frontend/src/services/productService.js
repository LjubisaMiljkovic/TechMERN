import axios from 'axios';

export const getAllProducts = async () => {
    try {
        const res = await axios.get('/api/product');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                products: res.data.products,
            }
        };
    } catch (err) {
        console.log(err, 'greska iz servisa GET AL PRODUCTS');
        return {
            status: err.response.data.err.status,
            message: err.response.data.message
        };
    }
}

export const getSingleProduct = async (productID) => {
    try {
        const res = await axios.get(`/api/product/single/${productID}`)
        console.log(res, 'res iz servisa GET SINGLE PRODUCT');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                product: res.data.product
            };
        }
        return res;
    } catch (error) {
        console.log(err, 'greska iz servisa GET SINGLE PRODUCT');
        return {
            status: err.response.data.err.status,
            message: err.response.data.message
        };
    }
}