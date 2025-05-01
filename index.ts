import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { placeOrder } from "./zerodhatrade";

// Create an MCP server
const server = new McpServer({
  name: "Zerodha Trade",
  version: "1.0.0"
});

server.tool("Buy a Stock", {stock: z.string(),quantity: z.number()  }, (input) => {
    const { stock, quantity } = input;
    
    placeOrder(stock, quantity, "BUY");
    return {
        content: [{
            type: "text",
            text: `Stock ${stock} bought for ${quantity} at ${new Date().toISOString()}`
        }]
    }
})


// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);