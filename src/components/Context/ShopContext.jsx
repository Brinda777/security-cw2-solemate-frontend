import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };


  useEffect(() => {
    fetch(`${process.env['REACT_APP_BACKEND_URL']}/product/get-all`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  
  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       try {
  //         let itemInfo = products.find((product) => product.id === Number(item));
  //         totalItem += itemInfo ? cartItems[item] : 0 ;
  //       } catch (error) {}
  //     }
  //   }
  //   return totalItem;
  // };

  // const addToCart = (itemId) => {
  //   if (!localStorage.getItem("auth-token")) {
  //     alert("Please Login");
  //     return;
  //   }
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch(`${backend_url}/addtocart`, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/form-data',
  //         'auth-token': `${localStorage.getItem("auth-token")}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ "itemId": itemId }),
  //     })
  //   }
  // };

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch(`${backend_url}/removefromcart`, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/form-data',
  //         'auth-token': `${localStorage.getItem("auth-token")}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ "itemId": itemId }),
  //     })
  //   }
  // };

  // const contextValue = { products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount };
  const contextValue = { products };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
