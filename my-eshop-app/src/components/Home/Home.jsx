import React from 'react'
import Header from '../../common/Header'
import { useTheme } from '@emotion/react'
import ProductsPage from '../Products/ProductsPage';
// import Theme from '../../assets/Theme'
const Home = () => {
  const theme =useTheme();
  return (
    <>
    <Header/>
    <ProductsPage/>
   <div bgcolor={theme.palette.primary.light} sx={{}}>Home</div>
    
    </>
  )
}

export default Home