import { KiteConnect } from "kiteconnect";

const apiKey = process.env.API_KEY;
let accessToken = process.env.ACCESS_TOKEN;

const kc = new KiteConnect({ api_key: apiKey || "" });

export async function placeOrder(tradingsymbol: string, quantity: number, transaction_type: "BUY" | "SELL") {
    try {
        kc.setAccessToken(accessToken || "");
        const profile = await kc.placeOrder("regular", {
            exchange: "NSE",
            tradingsymbol: tradingsymbol,
            transaction_type: transaction_type,
            quantity: quantity,
            product: "CNC",
            order_type: "MARKET",
    
        });
        console.log("Profile:", profile);
    } catch (err) {
        console.error(err);
    }
}

