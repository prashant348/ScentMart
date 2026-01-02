"use client"

import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useOrderConfirmationModelStore } from "@/zustand/OrderConfirmationModelStore"
import { createOrder } from "@/app/dashboard/actions"
import { useMessageModelStore } from "@/zustand/MessageModelStore"
import { CheckCircle2, Info } from "lucide-react"
import Link from "next/link"

interface Product {
    id: string
    name: string
    price: number
    quantity?: number
    image_url?: string
}

function MessageModel() {

    const { setIsMsgModelOpen, modelMsg } = useMessageModelStore()

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center pt-6"
            onClick={() => setIsMsgModelOpen(false, "")}
        >
            <div
                className={`h-20 w-70 bg-[#1f1f1f] rounded-2xl flex flex-col justify-center items-center gap-1 border border-[#4f4f4f] text-center font-semibold ${modelMsg.startsWith("O") ? "text-green-500" : "text-red-500"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <span className="flex items-center gap-1">
                    <span>
                        {modelMsg}
                    </span>
                    <span>
                        {modelMsg.startsWith("O") ? <CheckCircle2 size={18} /> : <Info size={18} />}
                    </span>
                </span>
                <span className="text-sm text-white text-sans font-light">
                    <span>Go to </span>
                    <Link
                        href={"/dashboard/orders"}
                        className="text-blue-500 hover:underline active:underline"
                        onClick={() => {
                            setIsMsgModelOpen(false, "")
                        }}
                    >
                        My Orders
                    </Link>
                </span>
            </div>
        </div>
    )
}

function OrderConfirmationModel(
    { currentProduct }: { currentProduct: Product }
) {

    const { setOpen } = useOrderConfirmationModelStore()
    const [isOrdering, setIsOrdering] = useState<boolean>(false);
    const { setIsMsgModelOpen } = useMessageModelStore()

    return (
        <div
            className="fixed top-0 left-0 text-sans w-full h-full flex justify-center items-center"
            onClick={() => setOpen(false)}
        >
            <div
                className="w-75 h-32 p-2 rounded-2xl bg-[#1f1f1f] border border-[#4f4f4f] flex flex-col justify-between items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-lg font-sans font-semibold text-center">
                    Are you sure you want to place order?
                </div>
                <div className="flex gap-2 w-full">
                    <button
                        className="p-2 bg-[#2f2f2f] hover:bg-[#3f3f3f] w-full rounded-lg font-semibold active:bg-[#3f3f3f]"
                        onClick={() => setOpen(false)}
                        style={{
                            cursor: isOrdering ? "not-allowed" : "pointer"
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="p-2 bg-amber-600 hover:bg-amber-500 w-full rounded-lg font-semibold active:bg-amber-500"
                        onClick={async () => {
                            setIsOrdering(true);
                            const orderPlaced = await createOrder(
                                currentProduct.id,
                                currentProduct.price,
                                currentProduct.quantity ?? 1,
                                currentProduct.name
                            );
                            setIsOrdering(false);
                            if (orderPlaced) {
                                setOpen(false);
                                setIsMsgModelOpen(true, "Order placed successfully!");
                            } else {
                                setOpen(false);
                                setIsMsgModelOpen(true, "Something went wrong! Please try again.");
                            }
                        }}
                        style={{
                            opacity: isOrdering ? 0.6 : 1,
                            cursor: isOrdering ? "not-allowed" : "pointer"
                        }}
                    >
                        {isOrdering ? "Ordering..." : "Order"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function ProductsContent(
    { currentProduct }: { currentProduct: Product }
) {

    const [counts, setCounts] = useState<Record<string, number>>({
        [currentProduct.id]: 1
    });
    const { isOpen, setOpen } = useOrderConfirmationModelStore();
    const { isMsgModelOpen, setIsMsgModelOpen } = useMessageModelStore();

    const increment = (id: string) => {
        setCounts(prev => ({ ...prev, [id]: Math.min(10, (prev[id] ?? 0) + 1) }));
    }

    const decrement = (id: string) => {
        setCounts(prev => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 0) - 1) }));
    }

    useEffect(() => {
        setIsMsgModelOpen(false, "")
    }, [])

    return (
        <div>
            <div className="w-full h-16 bg-[#1f1f1f] flex items-center gap-3 px-3">
                <button
                    className="rounded-full active:bg-[#2f2f2f] p-2 text-2xl font-bold"
                    onClick={() => redirect("/dashboard")}
                >
                    <ArrowLeft />
                </button>
                <span className="text-2xl font-bold">
                    {currentProduct.name}
                </span>
            </div>
            <div className="p-3 w-full flex flex-col gap-3">
                <div className="w-full sm:max-w-75 h-75 overflow-hidden rounded-2xl">
                    <img
                        src={currentProduct.image_url}
                        alt={currentProduct.name}
                        className="w-full h-full"
                    />
                </div>
                <div className="flex flex-col text-lg font-semibold">
                    <span>Product Name: {currentProduct.name}</span>
                    <span>Product Price: {currentProduct.price} ₹</span>
                    <span>Payment Method: Cash on Delivery</span>
                    <span>Select Product Quantity: </span>
                </div>
                <div
                    className="w-full h-10 flex justify-center text-3xl font-bold"
                >
                    <div className="bg-[#1f1f1f] h-full w-34 flex gap-3 justify-center items-center rounded-xl overflow-hidden">
                        <button
                            className="active:bg-[#2f2f2f] h-full w-full"
                            onClick={() => decrement(currentProduct.id)}
                        >
                            -
                        </button>
                        <span className="">{counts[currentProduct.id] ?? 1}</span>
                        <button
                            className="active:bg-[#2f2f2f] h-full w-full"
                            onClick={() => increment(currentProduct.id)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        className="w-full rounded-lg bg-amber-600 h-10 text-xl hover:bg-amber-500 cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        Order
                    </button>
                </div>
                <div className="text-sm text-red-500 py-1 font-sans text-center">
                    Note: Order can't be cancelled if once placed
                </div>
            </div>
            {isOpen && (
                <OrderConfirmationModel currentProduct={{ ...currentProduct, quantity: counts[currentProduct.id] }} />
            )}
            {isMsgModelOpen && (
                <MessageModel />
            )}
        </div>
    )
}
