import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import products from "@/data/products.json"

export default function CatalogPage() {
  return (
    <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="border-0 shadow-none bg-transparent cursor-pointer">
                <CardContent className="p-0 space-y-3">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
  )
}
