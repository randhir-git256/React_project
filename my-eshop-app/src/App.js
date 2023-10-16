import './App.css';
import Home from './components/Home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup/Signup';
import NotFound from './components/Not_Found/NotFound';
import SignIn from './components/Signin/Signin';
import ProductDetail from './ProductDetails/ProductDetail';
import CreateOrder from './components/CreateOrder/CreateOrder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/order" element={<CreateOrder/>} />
        <Route path="/Not_Found" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;