'use client'

import React, { useState, useEffect, useContext } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { MapPin, Clock, Trash2, Search, Upload } from 'lucide-react'
import { ShopsContext } from '../context/shopsContext'

export default function ShopDetailsPage() {
  const { isLoggedIn: { email } } = useContext(ShopsContext);
  const [shops, setShops] = useState([])
  const [filteredShops, setFilteredShops] = useState([])
  const [selectedShop, setSelectedShop] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3001/user/shop?email=${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
        setFilteredShops(data);
      })
      .catch((error) => console.error('Error:', error));
  }, [email])

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedShop),
    })
      .then((res) => res.json())
      .then((data) => {
        setShops((prevShops) =>
          prevShops.map((shop) => (shop._id === data._id ? data : shop))
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
    fetch(`http://localhost:3001/shop/${shopId}`, {
      method: 'DELETE',
    })
      .then(() => {
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photos', file);
        setSelectedShop({
          ...selectedShop,
          formData
        });
    }
  

  const handleDeleteImage = (index) => {
    const updatedImages = selectedShop.images.filter((_, i) => i !== index);
    setSelectedShop({ ...selectedShop, images: updatedImages });
  }

  const handleViewDetails = (shop) => {
    setSelectedShop(shop)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-4xl font-bold text-black mb-10">Shop Management</h1>
      <div className="mb-8 relative">
        <Input
          type="text"
          placeholder="Search shops by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-6 py-3 border border-gray-300 rounded-md w-full"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        { 
          filteredShops.length <= 0 ? (
            <h1 className="text-4xl font-semibold text-gray-600">No shops found</h1>
          ) : (
            filteredShops.map((shop) => (
              <Card key={shop._id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-black border-b border-gray-200">
                  <CardTitle className="text-2xl font-semibold text-white">{shop.shopname}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 flex items-center"><MapPin size={20} className="mr-2" /> {shop.location}</p>
                  <p className="text-gray-600 flex items-center mt-3"><Clock size={20} className="mr-2" /> {shop.opentime} - {shop.closetime}</p>
                  <p className="text-gray-600 mt-3">Owner Email: {shop.userEmail}</p>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => handleViewDetails(shop)}>View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl overflow-y-auto max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Shop' : 'Shop Details'}</DialogTitle>
                      </DialogHeader>
                      {selectedShop && (
                        <div className="grid gap-6 py-6">
                          <div className="grid grid-cols-2 gap-6">
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
                                  <SelectItem value="Clothing">Clothing</SelectItem>
                                  <SelectItem value="Electronics">Electronics</SelectItem>
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
                          <div>
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input
                              id="mobile"
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
                            <Label htmlFor="opentime">Opening Time</Label>
                            <Input
                              id="opentime"
                              name="opentime"
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
                              value={selectedShop.closetime}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <Label>Shop Images</Label>
                            <div className="grid grid-cols-2 gap-4">
                              {selectedShop.images && selectedShop.images.map((image, index) => (
                                <div key={index} className="relative">
                                  <img src={image} alt={`Shop Image ${index + 1}`} className="w-full h-auto rounded-lg" />
                                  {isEditing && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteImage(index)}
                                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            {/* {isEditing && (
                              <div className="mt-4">
                                <div className="flex items-center gap-4">
                                  <Label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                                      <Upload size={20} />
                                      <span>Upload Image</span>
                                    </div>
                                  </Label>
                                  <Input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                  />
                                </div>
                              </div>
                            )} */}
                          </div>
                          <div>
                            <Label>Services</Label>
                            {selectedShop.services && selectedShop.services.map((service, index) => (
                              <div key={index} className="flex gap-4 mt-2">
                                <Input
                                  placeholder="Service"
                                  value={service.service}
                                  onChange={(e) => handleServiceChange(index, 'service', e.target.value)}
                                  disabled={!isEditing}
                                />
                                <Input
                                  placeholder="Price"
                                  value={service.price}
                                  onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                                  disabled={!isEditing}
                                />
                                {isEditing && (
                                  <Button onClick={() => removeService(index)} variant="destructive">Remove</Button>
                                )}
                              </div>
                            ))}
                            {isEditing && (
                              <Button onClick={addService} variant="outline" className="mt-4">Add Service</Button>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2 mt-6">
                        {isEditing ? (
                          <>
                            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button onClick={handleSaveShop}>Save Changes</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
                            <Button variant="destructive" onClick={() => handleDeleteShop(selectedShop._id)}>Delete</Button>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))
          )
        }
      </div>
    </div>
  )
}