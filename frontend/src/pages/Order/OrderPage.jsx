import React from 'react'
import OrderProcessStepOne from './OrderProcessStepOne';
import OrderProcessStepTwo from './OrderProcessStepTwo';
import OrderFooter from './OrderFooter';
import { useSelector } from 'react-redux';



function OrderPage() {


const {currentStep} = useSelector((state) => state.orderStore);
const { cart } = useSelector((state) => state.cartStore);


const displayOrderProcessStep = () => {
    if (currentStep === 1) return <OrderProcessStepOne />
    if (currentStep === 2) return <OrderProcessStepTwo />
};

const displayOrderFooter = () => {
    if (cart.length) return <OrderFooter />
};

    return (
        <>
            <div className="container">
                {displayOrderProcessStep()}
                {displayOrderFooter()}
            </div>
        </>
    )
}

export default OrderPage