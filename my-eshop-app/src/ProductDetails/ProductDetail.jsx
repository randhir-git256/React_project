import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    //const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1); // State to track quantity input
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const URL = "http://localhost:3001/api/v1";

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`${URL}/products/${id}`);
            if (response.ok) {
                const product = await response.json();
                setProductDetails(product);
            } else {
                console.error('Error fetching product details:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [fetchProductDetails, id]);
    

    const placeOrder = async () => {
        // Check if productDetails exist
        if (!productDetails) {
            console.error("Product details are missing.");
            return;
        }

        try {
            const response = await fetch(`${URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: productDetails.id,
                    quantity: quantity,
                }),
            });

            if (response.ok) {
                console.log("Order placed successfully.");
                // You can navigate to a success page or display a success message here.
            } else {
                const errorMessage = await response.text();
                console.error('Error placing order:', errorMessage);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="product-detail">
            {productDetails ? (
                <div>
                    <img src={productDetails.imageURL} alt={productDetails.name} />
                    <h2>{productDetails.name}</h2>
                    <p>Price: ${productDetails.price}</p>
                    <p>Description: {productDetails.description}</p>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button onClick={placeOrder}>Order</button>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductDetail;
