import axios from 'axios';

export const addProduct = async (product) => {
    console.log(product, 'product');
    try {
        const res = await axios.post('/api/admin/product', product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res, 'res iz servisa ADD PRODUCT');
        return res;
    } catch (err) {
        console.error(err, 'greska iz servisa ADD PRODUCT');
        return err;
    }
};