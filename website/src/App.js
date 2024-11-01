import './App.css';
import About from './pages/about.js'
import Contact from './pages/contact.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/notFoundPage.js';
import MainLayout from './layouts/mainLayout.js';
import Dashboard from './components/dashboard';
import Shop from './pages/shop';
import { RegisterShop } from './pages/registerShop';
import { Category } from './pages/category';
import Login from './pages/login';
import Register from './pages/register';
import { useState, useEffect } from 'react';
import { ShopsContext } from './context/shopsContext';


function App() {

  const [shops, setShops] = useState([]);
  const [location, setLocation] = useState("");
  useEffect(() => {
    async function loadShops(location) {
      await fetch(`http://localhost:3001/shops/${location}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setShops(data);
        })
        .catch((error) => console.error("Error:", error))
    }

    loadShops(location);
  }, [location]);

  return (
    <>
      <ShopsContext.Provider value={{
        shops,
        location,
      }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Dashboard setLocation={setLocation} location={location} />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/shop/:id/:category' element={<Shop />} />
              <Route path="/category" element={<Category />}>
                <Route path=':id' element={<h1>Madhan</h1>} />
              </Route>
              <Route path='/register-shop' element={<RegisterShop />} />
            </Route>
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ShopsContext.Provider>
    </>
  );
}

export default App;