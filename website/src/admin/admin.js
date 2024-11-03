'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { MapPin, Clock, Trash2, Search } from 'lucide-react'


export default function AdminShopManagement() {
  const [shops, setShops] = useState([])
  const [filteredShops, setFilteredShops] = useState([])
  const [selectedShop, setSelectedShop] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/shops', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShops(data)
        setFilteredShops(data)
      })
      .catch((error) => console.error('Error:', error))
  }, [])
  
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase()
    const filtered = shops.filter(shop => 
      shop.location.toLowerCase().includes(lowercasedQuery) ||
      shop.shopname.toLowerCase().includes(lowercasedQuery)
    )
    setFilteredShops(filtered)
  }, [searchQuery, shops])

  const handleEditShop = (shop) => {
    setSelectedShop({ ...shop })
    setIsEditing(true)
  }

  const handleSaveShop = () => {
    fetch(`http://localhost:3001/shop/${selectedShop._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedShop),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update shop');
        }
        return res.json();
      })
      .then((data) => {
        setShops((prevShops) =>
          prevShops.map((shop) => {
            if(shop._id === data._id) {
              console.log('Updated shop:', data);
              console.log('Previous shop:', shop);
            }
            return shop._id === data._id ? data : shop
          })
        );
        setFilteredShops((prevFilteredShops) =>
          prevFilteredShops.map((shop) => (shop._id === data._id ? data : shop))
        );
        setIsEditing(false);
        setSelectedShop(data);
      })
      .catch((error) => console.error('Error:', error));
  }

  const handleDeleteShop = (shopId) => {
    console.log('Deleting shop:', shopId);
    fetch(`http://localhost:3001/shop/${shopId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete shop');
        }
        setShops(shops.filter(shop => shop._id !== shopId));
        setFilteredShops(filteredShops.filter(shop => shop._id !== shopId));
        setSelectedShop(null);
        setIsEditing(false);
      })
      .catch((error) => console.error('Error:', error));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedShop({ ...selectedShop, [name]: value })
  }

  const handleServiceChange = (index, field, value) => {
    const updatedServices = selectedShop.services.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    )
    setSelectedShop({ ...selectedShop, services: updatedServices })
  }

  const addService = () => {
    setSelectedShop({
      ...selectedShop,
      services: [...selectedShop.services, { service: "", price: "" }]
    })
  }

  const removeService = (index) => {
    setSelectedShop({
      ...selectedShop,
      services: selectedShop.services.filter((_, i) => i !== index)
    })
  }

  const handleViewDetails = (shop) => {
    setSelectedShop(shop)
    setIsEditing(false) // Reset editing state when viewing details
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Shop Management</h1>
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="Search shops by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { 
          filteredShops.length < 0 ? <p>No shops found</p> :
          filteredShops.map((shop) => (
          <Card key={shop._id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-black border-b border-gray-200">
              <CardTitle className="text-xl font-semibold text-white">{shop.shopname}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 flex items-center"><MapPin size={16} className="mr-2" /> {shop.location}</p>
              <p className="text-gray-600 flex items-center mt-2"><Clock size={16} className="mr-2" /> {shop.opentime} - {shop.closetime}</p>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => handleViewDetails(shop)}>View Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl overflow-y-auto max-h-[80vh]"> {/* Vertical scroll */}
                  <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Shop' : 'Shop Details'}</DialogTitle>
                  </DialogHeader>
                  {selectedShop && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Shop Name</Label>
                          <Input
                            id="name"
                            name="shopname"
                            value={selectedShop.shopname}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Shop Type</Label>
                          <Select
                            disabled={!isEditing}
                            value={selectedShop.shoptype}
                            onValueChange={(value) => setSelectedShop({ ...selectedShop, shoptype: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select shop type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Food">Food</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                              <SelectItem value="Automotive">Automotive</SelectItem>
                              <SelectItem value="Home Service">Home Service</SelectItem>
                              <SelectItem value="Beauty & Skincare">Beauty & Skincare</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Travel">Travel</SelectItem>
                              <SelectItem value="Shopping">Shopping</SelectItem>
                              <SelectItem value="Entertainment">Entertainment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={selectedShop.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="opentime">Opening Time</Label>
                          <Input
                            id="opentime"
                            name="opentime"
                            type="time"
                            value={selectedShop.opentime}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="closetime">Closing Time</Label>
                          <Input
                            id="closetime"
                            name="closetime"
                            type="time"
                            value={selectedShop.closetime}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="mobilenumber">Mobile Number</Label>
                        <Input
                          id="mobilenumber"
                          name="mobilenumber"
                          value={selectedShop.mobilenumber}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={selectedShop.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>Services</Label>
                        {selectedShop.services.map((service, index) => (
                          <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                            <Input
                              placeholder="Service"
                              value={service.service}
                              onChange={(e) => handleServiceChange(index, 'service', e.target.value)}
                              disabled={!isEditing}
                            />
                            <Input
                              placeholder="Price"
                              type="number"
                              value={service.price}
                              onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                              disabled={!isEditing}
                            />
                            {isEditing && (
                              <Button variant="destructive" onClick={() => removeService(index)}>
                                <Trash2 size={16} />
                              </Button>
                            )}
                          </div>
                        ))}
                        {isEditing && (
                          <Button onClick={addService} variant="outline">Add Service</Button>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end mt-4">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSaveShop}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </>
                    ) : (
                      <Button onClick={() => handleEditShop(selectedShop)}>Edit</Button>
                    )}
                    <Button variant="destructive" onClick={() => handleDeleteShop(selectedShop._id)} disabled={isEditing}>Delete</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))
        }
      </div>
    </div>
  )
}