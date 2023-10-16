import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const DeleteProductPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        history.push('/products'); // Redirect to products page after successful delete
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    handleDelete();
  }, [handleDelete]);

  return (
    <div>
      <p>Deleting product...</p>
    </div>
  );

};
export default DeleteProductPage;
