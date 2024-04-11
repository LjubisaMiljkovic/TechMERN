import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useRef, useState } from 'react';
import { addProduct } from '../../services/adminService';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../store/loader/loaderSlice.js';
import './AddProduct.scss';
import { toast } from 'react-toastify';

function AddProduct() {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        const newProduct = { ...product };
        newProduct[id] = value;
        setProduct(newProduct);
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = new FormData();
        newProduct.append('product', JSON.stringify(product));
        newProduct.append('file', file);

        dispatch(showLoader(true));
        const res = await addProduct(newProduct);
        dispatch(showLoader(false));

        if (res.status === 'success') {
            formRef.current.reset();
            setProduct({ title: '', description: '', price: '' });
            setFile(null);
            toast.success(res.message);
        } else toast.error(res.message);
    };

    return (
        <>
            <div className='add-product-wrapper'>
                <div className='content'>
                    <h1>Add Product</h1>
                </div>
                <form onSubmit={handleSubmit} ref={formRef} className='add-product-form'>
                    <div className='input-wrapper'>
                        <Label htmlFor='title'>Title</Label>
                        <Input type='text' id='title' placeholder='Type product title' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='description'>Description</Label>
                        <Input type='text' id='description' placeholder='Type product description' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='price'>Price</Label>
                        <Input type='number' id='price' placeholder='Type product price in EURO' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='image'>Image</Label>
                        <Input type='file' id='image' onChange={handleFile} />
                    </div>
                    <Button className='btn btn-primary'>Add Product</Button>
                </form>
            </div>
        </>
    );
}

export default AddProduct;