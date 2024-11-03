import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

export default function MainLayout({setIsLoggedIn, isLoggedIn}){
    const [location, setLocation] = useState(null);
    const [data, setData] = useState(null)

    function success(pos){
        const crd = pos.coords;
        setLocation([crd.latitude, crd.longitude]);
    }

    function error(err){
        console.log(err)
    }

    useEffect(() => {
        async function loadData() {
            if(location){
                navigator.geolocation.getCurrentPosition(success, error);
                const request = await fetch('https://localhost:3000/currentlocation' , {
                    method : "GET",
                    body : {
                        location,
                    }
                });
                const res = await request.json();
                setData(res);
            }
        }
        loadData();
    }, [])
    return(
        <>
            <Navbar 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
            />
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}