import React, { useState } from 'react';
import '../CSS/Cart.css'; // Ensure you have this CSS file imported
import { useCart } from '../../components/Context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    const handleQuantityChange = (productId, value) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) + value),
        }));
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    // Calculate subtotal and total items
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * (quantities[item._id] || 1)), 0);
    const totalItems = cartItems.reduce((acc, item) => acc + (quantities[item._id] || 1), 0);

    const handleGoToOrder = () => {
        navigate('/order', { state: { cartItems: cartItems, quantities: quantities, subtotal: subtotal} });
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items-list">
                        {cartItems.map((item) => (
                            <li key={item._id} className="cart-item">
                                <img src={process.env['REACT_APP_BACKEND_IMAGE_URL'] + item.product.imageUrl} alt={item.product.title} />
                                <div className="cart-item-details">
                                    <h2>{item.product.title}</h2>
                                    <p>Price: Rs. {item.product.price.toFixed(2)}</p>
                                </div>
                                <div className="cart-item-controls">
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                                        <input type="text" value={quantities[item._id] || 1} readOnly />
                                        <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                                    </div>
                                    <button onClick={() => handleRemoveFromCart(item._id)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <div className="summary-item">
                            <span>Total Items:</span> <span>{totalItems}</span>
                        </div>
                        <div className="summary-item">
                            <span>Subtotal:</span> <span>Rs. {subtotal.toFixed(2)}</span>
                        </div>
                        <button onClick={handleGoToOrder} className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
