import React, { useState } from "react";
import "./ProductDisplay.css";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { useCart } from "../Context/CartContext";

const ProductDisplay = ({ product }) => {
    const [rating, setRating] = useState(product.rating || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const { addToCart } = useCart();

    const handleClick = (value) => {
        setRating(value);
        // Optionally, send this rating to a server or store it
    };

    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const renderStars = () => {
        const maxRating = 5;
        let stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= (hoverRating || rating) ? 'filled' : ''}`}
                    onClick={() => handleClick(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={process.env['REACT_APP_BACKEND_IMAGE_URL'] + product.imageUrl} alt="img" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.title}</h1>
                <div className="productdisplay-right-stars">
                    {renderStars()}
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">Rs. {product.price.toFixed(2)}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Available Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>38</div>
                        <div>39</div>
                        <div>40</div>
                        <div>41</div>
                    </div>
                </div>
                <p className="productdisplay-right-category">
                    <span>Category :</span> {product.category}
                </p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
            <RelatedProducts id={product._id} category={product.category} />

        </div>
    );
};

export default ProductDisplay;
