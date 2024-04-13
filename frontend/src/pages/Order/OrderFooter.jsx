import React from 'react'
import { useSelector } from 'react-redux';
import './OrderFooter'

function OrderFooter() {

    const { currentStep } = useSelector((state) => state.orderStore);

    return (
        <>
            <div className="button-wrapper" style={currentStep ===1 ? {justifyContent: 'flex-end'} : {justifyContent: 'space-between'}}>
                {currentStep > 1 && <button>Back</button>}
                
                {currentStep === 1 ? <button>Proceed to payment</button> : <button>Submit Payment</button>}
            </div>
        </>
    )
}

export default OrderFooter