"use server";

import { supabase } from "@/libs/supabase";
import { auth } from "@clerk/nextjs/server";
import { sendTelegram } from "@/libs/telegram";

export async function addProduct(formData: FormData) {

    const { userId } = await auth();
    if (!userId) return;

    try {
        console.log("authenticated! user id: ", userId);
        const name = formData.get("name") as string;
        const price = Number(formData.get("price"));

        await supabase
            .from("products")
            .insert({ name, price });

        console.log("data inserted successfully!");
    } catch (e) {
        console.error("error in addProduct: ", e);
    }
}

export async function fetchProduts() {
    const { userId } = await auth();
    if (!userId) return;

    try {
        console.log("authenticated! user id: ", userId);
        const { data } = await supabase
            .from("products")
            .select("*");
        console.log("data fetched successfully!");
        return data
    } catch (e) {
        console.error("error in fetching products: ", e)
    }
}

export async function createOrder(
    productId: string,
    price: number,
    quantity: number,
    productName?: string
) {
    const { userId } = await auth();
    if (!userId) return;

    try {
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert({
                user_id: userId,
                total_amount: price * quantity,
            })
            .select()
            .single();

        if (orderError || !order) {
            console.log("orders insert failed!: ", orderError);
            return;
        }

        const { error: orderItemError } = await supabase
            .from("order_items")
            .insert({
                order_id: order?.id,
                product_id: productId,
                quantity: quantity,
                price: price * quantity,
            });

        if (orderItemError) {
            console.log("order items insert failed!: ", orderItemError);
            return;
        }

        await sendTelegram(
            `New order!\nProduct Name: ${productName}\nProduct ID: ${productId}\nQuantity: ${quantity}\nTotal price: ${price * quantity}`
        )

        console.log("order created successfully!");
    } catch (e) {
        console.error("error in creating order: ", e)
    }
}

export async function fetchOrders() {
    const { userId } = await auth();
    if (!userId) return;

    try {
        const { data: orders, error: ordersFetchingError } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
        
        if (ordersFetchingError) throw new Error("Error in fetching orders")

        console.log("orders fetched successfully!")
        return orders
    } catch (e) {
        console.error("error in fetching orders: ", e)
    }
}