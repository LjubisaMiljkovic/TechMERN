import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import { useSelector } from 'react-redux';
import './ShopCart.scss';

function ShopCart() {
    const [isSummary, setIsSummary] = useState(false);
    const { cart } = useSelector((state) => state.cartStore);

    useEffect(() => {
        console.log(cart, 'cart');

    }, [cart])

    const displayAllItems = () => {
        return cart.map((item, index) => {
            return <div className='shop-cart-item' key={index}>{item.title}
                <img src={`http://localhost:4000/uploads/${item.image}`} alt={item.title} />
                <div className="content">
                    <div className="title">{item.title}</div>
                    <div className="count">
                        <span>Count:</span>
                        <span>-</span>
                        <span>1</span>
                        <span>+</span>
                    </div>
                    <div className="price">399$</div>
                </div>
                    <div className="remuve">remuve</div>
            
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