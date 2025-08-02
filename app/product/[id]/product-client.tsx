"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

interface ProductPageClientProps {
  product: Product
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedPickup, setSelectedPickup] = useState<string>("")
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  
  const sizes = ["S", "M", "L", "XL"]
  const pickupLocations = ["Ann Arbor", "SF", "NYC"]
  
  // Placeholder images for gallery
  const galleryImages = [
    product.image || "/placeholder.svg",
    "/placeholder.svg?height=600&width=400&text=Image2",
    "/placeholder.svg?height=600&width=400&text=Image3",
    "/placeholder.svg?height=600&width=400&text=Image4",
    "/placeholder.svg?height=600&width=400&text=Image5"
  ]
  
  const isCheckoutEnabled = selectedSize && selectedPickup

  const handleCheckout = () => {
    if (isCheckoutEnabled) {
      alert(`Checkout initiated!\nProduct: ${product.name}\nSize: ${selectedSize}\nPickup: ${selectedPickup}\nPrice: $${product.price}`)
    }
  }

  return (
    <div className="bg-gray-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnail Column */}
            <div className="flex flex-col gap-3 w-20">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-[3/4] relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImageIndex === index 
                      ? "border-black" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={galleryImages[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div className="space-y-2">
              <h1 className="text-2xl font-medium text-gray-900">
                {product.name}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`w-12 h-12 rounded-md transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black hover:bg-gray-800"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Pickup Location */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Pickup</h3>
              <div className="flex gap-2">
                {pickupLocations.map((location) => (
                  <Button
                    key={location}
                    variant={
                      selectedPickup === location ? "default" : "outline"
                    }
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedPickup === location
                        ? "bg-black text-white border-black hover:bg-gray-800"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedPickup(location)}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Checkout Button */}
            <div className="pt-4">
              <Button
                className={`w-full font-medium py-5 rounded-md transition-colors ${
                  isCheckoutEnabled
                    ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                onClick={handleCheckout}
                disabled={!isCheckoutEnabled}
              >
                {isCheckoutEnabled
                  ? "Checkout"
                  : "Select Size and Pickup Location"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 