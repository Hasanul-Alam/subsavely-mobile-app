// utils/tokenEncoder.ts

// Encode token to Base64
export const encodeToken = (token: string): string => {
  try {
    return btoa(token); // plain string -> Base64
  } catch (error) {
    console.error("Error encoding token:", error);
    return "";
  }
};

// Decode token from Base64
export const decodeToken = (encodedToken: string): string => {
  try {
    return atob(encodedToken); // Base64 -> plain string
  } catch (error) {
    console.error("Error decoding token:", error);
    return "";
  }
};
