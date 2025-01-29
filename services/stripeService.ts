import { KEYS } from "@/constants";
import axios from "axios";

// Create Payment Intent
export const createPaymentIntent = async (
  amount: any,
  currency: any,
  email: any
) => {
  try {
    const response = await axios.post(
      `${KEYS.API_BASE_URL}/api/payment/create-intent`,
      {
        amount: parseInt(amount, 10) * 100,
        currency,
        email,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating payment intent:", error.message);
    throw error;
  }
};

// Retrieve Payment Details
export const getPaymentDetails = async (paymentId: any) => {
  try {
    const response = await axios.get(`${KEYS.API_BASE_URL}/${paymentId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error retrieving payment details:", error.message);
    throw error;
  }
};
