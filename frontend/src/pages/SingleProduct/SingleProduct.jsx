import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../store/loader/loaderSlice';
import { getSingleProduct } from '../../services/productService';
import useCurrencyConverter from '../../utils/convertPrice'
import { addItem } from '../../store/cart/cartSlice';

function SingleProduct() {
  const dispatch = useDispatch()
  const params = useParams();
  const [product, setProduct] = useState({});
  const convertprice = useCurrencyConverter()

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(showLoader(true));
      const res = await getSingleProduct(params.productID);
      if (res.status === 'success') setProduct(res.product);
      dispatch(showLoader(false));
    };
    fetchProduct()
  },
    [dispatch, params.productID]
  );
  return (

    <>
      <div className="container">
        {
          Object.prototype.hasOwnProperty.call(product, '_id') && (
            <div className='card'>
              <img className='card-img-top' src={`http://localhost:4000/uploads/${product.image}`} alt="" />
              <div className="card-body">
                <h4 className="card-title">{product.title}</h4>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className='badge bg-danger'>{convertprice(product.price)}</span>
                  <button onClick={() => dispatch(addItem(product))}
                    className='btn btn-primary'>
                    Add to card
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div>

    </>

  )
}

export default SingleProduct