import ProductsContent from "@/components/ProductsContent/ProductsContent"

export default async function page(
    { searchParams }: { searchParams: Promise<{ id: string, name: string, price: number, image_url: string }> }
) {

    const productId = (await searchParams).id
    const productName = (await searchParams).name
    const productPrice = (await searchParams).price
    const ImageUrl = (await searchParams).image_url

    const currentProduct = {
        id: productId,
        name: productName,
        price: productPrice,
        image_url: ImageUrl
    }

    return (
        <div>
            <ProductsContent currentProduct={currentProduct} />
        </div>
    )
}
