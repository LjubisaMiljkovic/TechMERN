import React, { useEffect, useState } from 'react'
import { FaMinusCircle, FaPlusCircle, FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import { useDispatch, useSelector } from 'react-redux';
import './ShopCart.scss';
import useCurrencyConverter from '../../utils/convertPrice';
import { toast } from 'react-toastify';
import { removeItem, setNewOld, handleCountItem } from '../../store/cart/cartSlice';
import { localStorageConfig } from '../../config/localStorageConfig';

function ShopCart() {
    const dispatch = useDispatch();
    const [isSummary, setIsSummary] = useState(false);
    const { cart } = useSelector((state) => state.cartStore);
    const { isNewItem } = useSelector((state) => state.cartStore);
    const { isOldItem } = useSelector((state) => state.cartStore);
    const convertPrice = useCurrencyConverter();

    useEffect(() => {
        isNewItem && toast.success('New product added');
        isOldItem && toast.warning('You imcreased this product quantity');
        dispatch(setNewOld());

    }, [isNewItem, isOldItem, dispatch]);

    useEffect(() => {
        if(cart.length) {
            localStorage.setItem(localStorageConfig.CART, JSON.stringify(cart));
        }
    },[cart]);

    const displayAllItems = () => {
        return cart.map((item, index) => {
            return <div className='shop-cart-item' key={index}>{item.title}
                <img src={`http://localhost:4000/uploads/${item.image}`} alt={item.title} />
                <div className="content">
                    <div className="title">{item.title}</div>
                    <div className="count">
                        <span>Count:</span>
                        <span><FaMinusCircle onClick={() => dispatch(handleCountItem({ index, isIncrease: false }))} />{' '}
                        </span>
                        <span>{item.count}</span>
                        <span><FaPlusCircle onClick={() => dispatch(handleCountItem({ index, isIncrease: true }))} /></span>
                    </div>
                    <div className="price">Total: {convertPrice(item.totalPrice)}</div>
                </div>
                <div className="remuve">
                    <FaTrashAlt onClick={() => dispatch(removeItem(index))} />
                </div>

            </div >
        })
    }

    return (
        <>
            <div onMouseEnter={() => setIsSummary(true)} onMouseLeave={() => setIsSummary(false)} className="shop-cart">
                <Link to={routesConfig.ORDER.url}>
                    <FaShoppingCart />
                    <span className='shop-cart-badge'>{cart.length ? cart.length : null}</span>
                </Link>

                {cart.length > 0 && isSummary && (
                    <div className="shop-cart-summary">
                        <div className="shop-cart-items">{displayAllItems()}</div>
                        <div className="order-btn">
                            <button className='btn btn-sm btn-primary'>
                                <Link to={routesConfig.ORDER.url}>Go to Checkot</Link>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ShopCart