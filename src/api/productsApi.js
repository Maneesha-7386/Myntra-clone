import { generateMockData } from "../utils/mockDataGenerator";

const API_URL = "https://693a6b269b80ba7262c9d44c.mockapi.io/homeData";

// Fix: Don't generate mock data immediately as it slows down initial load
let cachedLocalData = null;

export const getAllProducts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // Requirement: use data[0]
    const apiData = Array.isArray(data) ? data[0] : data;
    return apiData;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
};

export const getSingleProduct = async (id) => {
  if (!cachedLocalData) cachedLocalData = generateMockData();

  // Find in all products across sections
  for (const section of Object.values(cachedLocalData)) {
    if (section.products) {
      const found = section.products.find(p => p.id === id);
      if (found) return found;
    }
  }
  return null;
};
