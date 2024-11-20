import axios from "axios";
const MAYA_API_URL = "https://payments-web-sandbox.paymaya.com";
const PUBLIC_KEY = "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah"; // Sandbox public key
const SECRET_KEY = "sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl";

export const createMayaPayment = async (request) => {
  try {
    console.log("Creating Maya payment request:", request);

    const response = await axios.post(
      MAYA_API_URL,
      {
        totalAmount: {
          value: request.totalAmount,
          currency: request.currency,
        },
        redirectUrl: request.redirectUrl,
      },
      {
        headers: {
          Authorization: `Basic ${btoa(PUBLIC_KEY + ":")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Maya payment response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Maya payment error:", error);
    throw error;
  }
};
