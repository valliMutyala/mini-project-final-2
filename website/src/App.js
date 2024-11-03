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
import { useState, useEffect } from 'react';
import { ShopsContext } from './context/shopsContext';
import LandingPage from './pages/loginAndSignup';


function App() {

  const [shops, setShops] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        isLoggedIn,
        setIsLoggedIn,
      }}>
        <BrowserRouter>
        {(isLoggedIn ?
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Dashboard setLocation={setLocation} location={location}/>} />
              <Route path="/shop/:id/:category" element={<Shop />} />
              <Route path="/registershop" element={<RegisterShop />} />
              <Route path="/about" element={<About />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          :
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LandingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        )}
        </BrowserRouter>
      </ShopsContext.Provider>
    </>
  );
}

export default App;