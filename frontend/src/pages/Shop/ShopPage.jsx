import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService.js';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../store/loader/loaderSlice.js';
import './ShopPage.scss';
import useCurrencyConverter from '../../utils/convertPrice.js';
import { Link } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig.js';

function ShopPage() {
    const dispatch = useDispatch();
    const convertPrice = useCurrencyConverter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(showLoader(true));
            const res = await getAllProducts();
            dispatch(showLoader(false));
            console.log(res, 'res na frontu GET ALL PRODUCTS');
            if (res.status === 'success') setProducts(res.products);
        };
        fetchProducts();
    }, [dispatch]);

    return (
        <>
            <div className='container'>
                <div className='row py-5'>
                    {products.length > 0 &&
                        products.map((product, index) => {
                            return (
                                <div key={index} className='col-4 mb-4'>
                                    <div className='card p-3'>
                                        <img
                                            className='card-img-top'
                                            src={`http://localhost:4000/uploads/${product.image}`}
                                            alt={product.title}
                                        />
                                        <div className='card-body'>
                                            <h5 className='card-title'>{product.title}</h5>
                                            <p className='card-text'>{product.description}</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <Link to={routesConfig.SINGLE_PRODUCT.dinamicURL(product._id)}>
                                                <button className='btn btn-primary'>View Product</button>
                                            </Link>
                                            <span className='text-muted'>{convertPrice(product.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default ShopPage;