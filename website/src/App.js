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
import {useState, useEffect } from 'react';
import { ShopsContext } from './context/shopsContext';


function App() {

  const [shops, setShops] = useState([]);

  const demoData = [
    {
      shopname: "Style Studio",
      location: "123 Fashion Ave", 
      shoptype: "Salon",
      mobilenumber: "555-0123",
      email: "style@studio.com",
      opentime: "09:00",
      closetime: "18:00",
      images: ["salon1.jpg", "salon2.jpg"],
      services: ["Haircut", "Coloring", "Styling"]
    },
    {
      shopname: "Quick Fix Auto",
      location: "456 Mechanic St",
      shoptype: "Auto Repair", 
      mobilenumber: "555-0456",
      email: "service@quickfix.com",
      opentime: "08:00",
      closetime: "17:00",
      images: ["garage1.jpg", "garage2.jpg"],
      services: ["Oil Change", "Brake Service", "Tune-up"]
    },
    {
      shopname: "Fresh Bites Cafe",
      location: "789 Main St",
      shoptype: "Restaurant",
      mobilenumber: "555-0789",
      email: "info@freshbites.com", 
      opentime: "07:00",
      closetime: "21:00",
      images: ["cafe1.jpg", "cafe2.jpg"],
      services: ["Breakfast", "Lunch", "Coffee"]
    },
    {
      shopname: "Tech Solutions",
      location: "321 Digital Ave",
      shoptype: "Electronics",
      mobilenumber: "555-0321",
      email: "support@techsolutions.com",
      opentime: "10:00",
      closetime: "19:00",
      images: ["tech1.jpg", "tech2.jpg"],
      services: ["Repairs", "Sales", "Upgrades"]
    },
    {
      shopname: "Green Thumb Garden",
      location: "654 Plant St",
      shoptype: "Garden Center",
      mobilenumber: "555-0654",
      email: "info@greenthumb.com",
      opentime: "08:00",
      closetime: "18:00",
      images: ["garden1.jpg", "garden2.jpg"],
      services: ["Plants", "Landscaping", "Garden Supplies"]
    },
    {
      shopname: "Fitness First",
      location: "987 Health Blvd",
      shoptype: "Gym",
      mobilenumber: "555-0987",
      email: "join@fitnessfirst.com",
      opentime: "06:00",
      closetime: "22:00",
      images: ["gym1.jpg", "gym2.jpg"],
      services: ["Personal Training", "Classes", "Equipment"]
    },
    {
      shopname: "Pet Paradise",
      location: "147 Paw Ave",
      shoptype: "Pet Store",
      mobilenumber: "555-0147",
      email: "care@petparadise.com",
      opentime: "09:00",
      closetime: "20:00",
      images: ["pets1.jpg", "pets2.jpg"],
      services: ["Grooming", "Supplies", "Pet Food"]
    },
    {
      shopname: "Book Nook",
      location: "258 Reader Lane",
      shoptype: "food",
      mobilenumber: "555-0258",
      email: "books@booknook.com",
      opentime: "10:00",
      closetime: "21:00",
      images: ["books1.jpg", "books2.jpg"],
      services: ["New Books", "Used Books", "Coffee Bar"]
    },
    {
      shopname: "Clean & Press",
      location: "369 Laundry St",
      shoptype: "food",
      mobilenumber: "555-0369",
      email: "service@cleanpress.com",
      opentime: "07:00",
      closetime: "19:00",
      images: ["laundry1.jpg", "laundry2.jpg"],
      services: ["Dry Cleaning", "Pressing", "Alterations"]
    },
    {
      shopname: "Sweet Treats",
      location: "741 Dessert Rd",
      shoptype: "Bakery",
      mobilenumber: "555-0741",
      email: "orders@sweettreats.com",
      opentime: "07:00",
      closetime: "20:00",
      images: ["bakery1.jpg", "bakery2.jpg"],
      services: ["Custom Cakes", "Pastries", "Bread"]
    }
  ];

  useEffect(() => {
    setShops(demoData);
    fetch(`http://localhost:3001/shops`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
      })
      .catch((error) => console.error("Error:", error))
  }
    , []);

  return (
    <>
      <ShopsContext.Provider value={shops}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/shop/:id' element={<Shop />} />
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