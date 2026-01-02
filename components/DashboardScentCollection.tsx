"use client"

import Footer from './Footer/Footer';
import { redirect } from 'next/navigation';

interface Product {
    id: string
    name: string
    price: number
    image_url?: string
}

export default function DashboardScentCollection(
    { products }: { products: Product[] }
) {

    return (
        <div className=' overflow-y-auto h-[calc(100vh-96px)]'>
            <div className='p-4 flex flex-wrap gap-4 justify-center'>
                {products.map((product, index) => (
                    <div
                        key={index}
                        className='h-90 w-90 rounded-2xl p-5 bg-[#1f1f1f] flex flex-col gap-2'
                        onClick={() => redirect(`/dashboard/products?id=${product.id}&name=${product.name}&price=${product.price}&image_url=${product.image_url}`)}
                    >
                        <div className='bg-[#2f2f2f] rounded-xl h-full w-full overflow-hidden'>
                            <img
                                key={index}
                                src={product.image_url}
                                alt={product.name}
                                className='h-full w-full'
                            />
                        </div>
                        <div className='flex justify-between font-bold text-xl'>
                            <span>{product.name}</span>
                            <span>{product.price} ₹</span>
                        </div>
                        <div className='flex gap-2 justify-between w-full font-semibold'>
                            {/* <button 
                            className='p-2 rounded-lg bg-amber-700 w-full'
                        >
                            Add to cart
                        </button> */}
                            <button
                                className='p-2 rounded-lg bg-amber-600 w-full active:bg-amber-700'
                                onClick={() => redirect(`/dashboard/products?id=${product.id}&name=${product.name}&price=${product.price}&image_url=${product.image_url}`)}
                            >
                                Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />

        </div>
    )
}