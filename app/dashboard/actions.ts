"use server";

import { supabase } from "@/libs/supabase";
import { auth } from "@clerk/nextjs/server";

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