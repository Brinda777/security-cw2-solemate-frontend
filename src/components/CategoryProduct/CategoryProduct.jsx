import React, { useState, useEffect } from 'react';
import { getProductsByCategoryApi } from '../../apis/Api';
import './CategoryProduct.css';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 8; // Number of products per page

const CategoryProduct = ({ category }) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalFetched, setTotalFetched] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await getProductsByCategoryApi(category);
                setTotalFetched(res.data.products);
                setProductList(res.data.products.slice(0, PAGE_SIZE)); 
                setLoading(false);
            } catch (err) {
                setError('Failed to load products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    const totalPages = Math.ceil(totalFetched.length / PAGE_SIZE);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        setProductList(totalFetched.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
    };

    return (
        <div className="product-listing-page">
            <header>
                <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
            </header>
            <main>
                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        Loading...
                    </div>
                )}
                {error && <p className="error">{error}</p>}
                <div className="product-grid">
                    {productList.length > 0 ? (
                        productList.map(product => (
                        <div key={product.id} className="product-card">
                        <Link to={`/product/${product._id}`}>

                            <img src={process.env.REACT_APP_BACKEND_IMAGE_URL + product.imageUrl} alt={product.title} />
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                                <p className="category-product-price">Rs. {product.price.toFixed(2)}</p>
                        </Link>

                        </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
};

export default CategoryProduct;
