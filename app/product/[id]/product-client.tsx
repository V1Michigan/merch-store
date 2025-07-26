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

  const sizes = ["S", "M", "L", "XL"]
  const pickupLocations = ["Ann Arbor", "SF", "NYC"]

  const isCheckoutEnabled = selectedSize && selectedPickup

const handleCheckout = async () => {
  if (!isCheckoutEnabled) return;

  const payload = {
    product: product.name,
    size: selectedSize,
    pickup: selectedPickup,
    price: product.price,
    stripe_price: product.price * 100,
    //email: user.email, // optional but useful
  };

  try {
    const response = await fetch('/api/start-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log(result);

    if (result.link) {
      // Redirect to Stripe Checkout
      window.location.href = result.link;
    } else {
      alert("Something went wrong. No redirect URL.");
    }

  } catch (err) {
    console.error('Checkout error:', err);
    alert('Checkout failed. Please try again.');
  }
};


  return (
    <div className="bg-gray-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
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
                className={`w-full font-medium py-3 rounded-md transition-colors ${
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