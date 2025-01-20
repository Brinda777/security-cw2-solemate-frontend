import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/PaymentSuccess.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="payment-success-page">
            <div className="success-message">
                <h1>Payment Successful!</h1>
                <p>Thank you for your purchase. Your order has been placed successfully.</p>
            </div>
            <button className="go-home-button" onClick={handleGoHome}>
                Go to Homepage
            </button>
        </div>
    );
};

export default PaymentSuccess;
