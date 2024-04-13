import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useCurrencyConverter from '../../utils/convertPrice';
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { handleCountItem, removeItem } from '../../store/cart/cartSlice';


function OrderProcessStepOne() {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cartStore);
    const convertPrice = useCurrencyConverter()

    const displayOrderTable = () => {
        return cart.map((item, index) => {
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                        <img src={`http://localhost:4000/uploads/${item.image}`} alt={item.title} />
                    </td>
                    <td>{item.title}</td>
                    <td>
                        <span><FaMinusCircle onClick={() => dispatch(handleCountItem({ index, isIncreas: false }))} />{' '}
                        </span>
                        <span>{item.count}</span>
                        <span><FaPlusCircle onClick={() => dispatch(handleCountItem({ index, isIcrease: true }))} /></span>
                    </td>
                    <td>{convertPrice(item.totalPrice)}</td>
                    <td>
                        <FaTrashAlt onClick={() => dispatch(removeItem(index))} />
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr >
                        <th scope="col">No</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Count</th>
                        <th scope="col">Price</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>{cart.length ? displayOrderTable() : <tr>
                    <td>Yor cart is empty</td>
                </tr>}</tbody>
            </table>
        </>
    )
}

export default OrderProcessStepOne