import { notFound } from "next/navigation"
import { ProductPageClient } from "./product-client"
import products from "@/data/products.json"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const productId = Number.parseInt(id)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}
