import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const UpdateProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [updatedProduct, setUpdatedProduct] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/products/${id}`);
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
      } else {
        console.error('Error fetching product details:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/v1/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        history.push('/products'); // Redirect to products page after successful update
      } else {
        console.error('Error updating product details:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        await fetchProductDetails();
    };
    fetchData();
}, [id, fetchProductDetails]);


  return (
    <div>
      <h2>Update Product Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name || product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price || product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={updatedProduct.description || product.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProductPage;