import axios from "axios";
import BASE_URL from "../config";

const api = axios.create({
    baseURL: BASE_URL, // Set the base URL for all requests
});

// Example: Fetch all subscriptions
export const getSubscriptions = async () => {
    try {
        const response = await api.get("/subscriptions");
        return response.data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
    }
};

// Example: Add a new subscription
export const addSubscription = async (subscriptionData) => {
    try {
        const response = await api.post("/subscriptions", subscriptionData);
        return response.data;
    } catch (error) {
        console.error("Error adding subscription:", error);
        throw error;
    }
};

export default api;
