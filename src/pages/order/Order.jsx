import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/Order.css";
import {
  createOrderApi,
  khaltiApi,
  removeItemsFromCartApi,
} from "../../apis/Api";
import { toast } from "react-toastify";
import { useCart } from "../../components/Context/CartContext";

const Order = () => {
  const location = useLocation();
  const { updateCartCount, removeItemsFromCart } = useCart();
  const navigate = useNavigate();
  const { cartItems, quantities, subtotal } = location.state || {
    cartItems: [],
    quantities: {},
    subtotal: null,
  };

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare products data
    const products = cartItems.map((cartItem) => ({
      product: cartItem.product,
      quantity: quantities[cartItem._id] || 1,
    }));

    const data = {
      products: products,
      receiverName: userDetails.name,
      receiverAddress: userDetails.address,
      receiverPhone: userDetails.phone,
      receiverEmail: userDetails.email,
      grandTotal: subtotal,
    };

    try {
      const res = await createOrderApi(data);
      toast.success(res.data.message);
      await removeItemsFromCartApi();
      updateCartCount(0);
      removeItemsFromCart();
      await khaltiApi()
        .then((res) => {
          window.location.href = res.data.payment_url;
        })
        .catch((error) => {});
      //   navigate("/"); // without payment integration
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="order-page">
      <h1>Order Page</h1>

      <div className="cart-items">
        <h2>Cart Items</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <span>{item.product.title}</span>
              <span>
                Rs. {item.product.price.toFixed(2)} x{" "}
                {quantities[item._id] || 1}
              </span>
            </li>
          ))}
        </ul>
        <h3>Sub Total: Rs. {subtotal?.toFixed(2)}</h3>
      </div>

      <div className="user-details">
        <h2>User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button className="order-button" type="submit">
            Pay with Khalti
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
