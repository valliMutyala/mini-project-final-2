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
import { ToastViewport, ToastProvider } from './components/ui/toast';
import LandingPage from './pages/loginAndSignup';
import ShopDetailsPage from './pages/shopDetailsPage';
import AdminShopManagement from './admin/admin';


function App() {

  const [shops, setShops] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState({
    email: '',
    isLogged: false,
    isAdmin: true,
  });


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
    const email = JSON.parse(localStorage.getItem('email'));
    if (email) {
      setIsLoggedIn({
        email: email,
        isLogged: true,
      });
    }
  }, [location]);

  return (
    <>
      <ToastProvider>
        <ShopsContext.Provider value={{
          shops,
          location,
          isLoggedIn,
          setIsLoggedIn,
        }}>
          <BrowserRouter>
            <Routes>
              {(isLoggedIn.isLogged ?
                <Route path="/" element={<MainLayout />}>
                  <Route path="/" element={<Dashboard setLocation={setLocation} location={location} />} />
                  <Route path="/shop/:id/:category" element={<Shop />} />
                  <Route path="/register-shop" element={<RegisterShop />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/category/:id" element={<Category />} />
                  <Route path="/shopDetailsPage" element={<ShopDetailsPage />} />
                  <Route path="/admin" element={<AdminShopManagement />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/about" element={<About />} />
                </Route>
                :
                <Route path="/" element={<MainLayout />}>
                  <Route index path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LandingPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/about" element={<About />} />
                </Route>
              )}
            </Routes>
          </BrowserRouter>
          <ToastViewport />
        </ShopsContext.Provider>
      </ToastProvider>
    </>
  );
  
  

  //return <ShopsContext.Provider value={{isLoggedIn}} ><AdminShopManagement /> </ShopsContext.Provider>
}

export default App;