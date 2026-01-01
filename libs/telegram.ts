export async function sendTelegram(message: string) {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
        
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: message
            })
        });

        if (!res.ok) throw new Error("Error in sending telegram: ");

        console.log("telegram sent successfully!");
    } catch (e) {
        console.error("error in sending telegram: ", e);
    }
}