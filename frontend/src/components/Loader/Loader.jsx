import React from 'react'
import './Loader.scss'
import { useSelector } from 'react-redux'



function Loader() {
    const { showLoader } = useSelector((state) => state.loaderStore)


    return (
        <>
            {showLoader ? (
                <div className='loader-wrapper'>
                    <div className="loader">

                    </div>
                </div>

            ) : null}
        </>
    )
}

export default Loader