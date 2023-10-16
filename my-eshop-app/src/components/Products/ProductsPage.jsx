import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';

import Card from '@mui/material/Card';
import { CardMedia, Grid, ToggleButtonGroup } from '@mui/material';
import '../Products/Product.css'
// import ProductDetail from '../../ProductDetails/ProductDetail';

function ProductsPage() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [sortingOption, setSortingOption] = useState('default');
  
  const fetchCategories = async () => {
    const url = 'http://localhost:3001/api/v1';
    try {
      const response = await fetch(`${url}/products`);
      if (response.ok) {
        const categories = await response.json();

        console.log("Response", response);
        console.log(categories);
        // return categories;
        setProducts(categories)
      } else {
        console.error('Error fetching categories:', response.statusText);

      }
    } catch (error) {
      console.error('Fetch error:', error);

    }
  };

  useEffect(() => {
    fetchCategories()

  }, []);


  
  const handleSortingChange = (option) => {
    setSortingOption(option);
    switch (option) {
      case 'default':
        console.log("acessing");
        fetchCategories();
        break;

      case 'priceHighToLow':
        setProducts([...products].sort((a, b) => b.price - a.price));
        break;

      case 'priceLowToHigh':
        setProducts([...products].sort((a, b) => a.price - b.price));
        break
      default:
        break;
    }
    
  };

  return (
    <div>
      
      


      <ToggleButtonGroup
        className="sorting-buttons"
        value={sortingOption}
        exclusive
        onChange={(event, newOption) => handleSortingChange(newOption)}
      >
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="priceHighToLow">Price High to Low</ToggleButton>
        <ToggleButton value="priceLowToHigh">Price Low to High</ToggleButton>
      </ToggleButtonGroup>

      {/* Display Products */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} md={4} key={product._id}>
            <Card sx={{ maxWidth: 345 }}>

              <CardMedia
                component="img"
                height="194"
                sx={{ objectFit: 'contain' }}
                image={product.imageURL}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>RS. {product.price} </p>
              <h2>{product.description}</h2>

              <button onClick={() => navigate(`/product/${product._id}`)} >View Details</button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductsPage;