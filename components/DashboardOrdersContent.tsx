"use client"

import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

interface Product {
    id: string
    name: string
    price: number
    image_url?: string
}

interface OrderItem {
    id: string
    product_id: string
    quantity: number
    price: number
    products?: Product[]
}

interface Order {
    id: string
    status: string
    total_amount: number
    created_at: string
    order_items?: OrderItem[]
}

export default function DashboardOrdersContent(
    { orders }: { orders: Order[] }
) {
    return (
        <div>
            <div className="h-16 w-full text-2xl font-bold flex items-center gap-3 px-5 bg-[#0f0f0f]">
                <button
                    className="rounded-full active:bg-[#1f1f1f] p-2"
                    onClick={() => redirect("/dashboard")}
                >
                    <ArrowLeft />
                </button>
                <span>My Orders</span>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-64px)] p-2">
                <div className="h-full flex flex-col gap-2">
                    {orders.length ? orders.map((order, index) => {
                        return (
                            <div
                                key={index}
                                className='font-sans w-full rounded-xl p-2 bg-[#1f1f1f] flex flex-col gap-2'
                            >
                                <div className="h-full w-full flex gap-2">
                                    <div className='bg-[#2f2f2f] rounded-xl h-20 w-20 overflow-hidden shrink-0'>
                                        {order.order_items?.map(item => (
                                            <img
                                                key={index}
                                                src={(item.products as unknown as Product)?.image_url}
                                                alt={(item.products as unknown as Product)?.name}
                                                className='h-full w-full'
                                            />
                                        ))}
                                        {/* <img
                                            src={order.order_items?.[0]?.products?.[0]?.image_url}
                                            alt={order.order_items?.[0]?.products?.[0]?.name}
                                            className="h-full w-full"
                                        /> */}
                                    </div>
                                    <div className='flex flex-col text-sm'>
                                        <div>Order Id: {order.id}</div>
                                        <div className="text-xs text-gray-400">{new Date(order.created_at).toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    {order.order_items && order.order_items.length ? (
                                        <div className="flex flex-col gap-1">
                                            {order.order_items.map((item) => (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <div>
                                                        One piece price: {(item.products as unknown as Product)?.price}
                                                    </div>
                                                    <div>
                                                        {
                                                            // handle both shapes:
                                                            // 1) products is an array => use first element
                                                            // 2) products is an object => use .name
                                                            // 3) fallback to product_id
                                                            (Array.isArray(item.products)
                                                                ? item.products[0]?.name
                                                                : (item.products as unknown as Product)?.name
                                                            ) ?? `Product Id: ${item.product_id}`
                                                        } x {item.quantity}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-400">No items</div>
                                    )}
                                </div>

                                <div className="w-full flex justify-between">
                                    <span>Status: {order.status}</span>
                                    <span>Total amount: {order.total_amount} ₹</span>
                                </div>
                            </div>
                        )
                    }) :
                        <div className="w-full h-full flex justify-center items-center text-lg font-semibold">
                            No orders found
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
