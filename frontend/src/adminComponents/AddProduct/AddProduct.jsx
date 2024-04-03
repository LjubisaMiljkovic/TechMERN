import React, { useState } from 'react'
import Label from '../../components/Label/Label'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { addProduct } from '../../services/adminService'
import { useDispatch } from 'react-redux';
import { showLoader } from '../../store/loader/loaderSlice';
import './AddProduct.scss'

function AddProduct() {
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        //image:'',
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        const newProduct = { ...product }
        newProduct[id] = value;
        setProduct(newProduct);
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newProduct = new FormData();
        newProduct.append('product', JSON.stringify(product));
        newProduct.append('file', file);

        dispatch(showLoader(true));
        const res = await addProduct(newProduct);
        dispatch(showLoader(false));
    }

    return (
        <>
            <div className="add-product-wrapper">
                <div className="content">
                    <h1>Add Product</h1>
                </div>
                <form onSubmit={handleSubmit} className='add-product-form'>
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
                        <Input type='number' id='price' placeholder='Type product price' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='image'>Image</Label>
                        <Input type='file' id='image' onChange={handleFile} />
                    </div>
                    <Button className='btn btn-primary'>Add Product</Button>
                </form>

            </div>
        </>
    )
}

export default AddProduct