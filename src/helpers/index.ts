import { v4 as uuid } from "uuid";

export const getFileExtension = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex !== -1) {
    return fileName.slice(dotIndex);
  }
  return "";
};

export const generateUniqueFileName = (fileName: string): string => {
  const uniqueId = uuid().replace(/-/g, ""); // Remove dashes from the UUID
  const fileExtension = getFileExtension(fileName);
  const baseFileName = fileName.replace(/\.[^/.]+$/, ""); // Remove existing extension
  const uniqueFileName = `${baseFileName}-${uniqueId}${fileExtension}`;
  return uniqueFileName;
};

export const cleanUpUrl = (inputUrl: string): string => {
  try {
    const url = new URL(inputUrl);

    // Remove trailing slash from the pathname
    url.pathname = url.pathname.replace(/\/$/, "");

    // Return the cleaned-up URL
    return url.href;
  } catch (error) {
    console.error("Invalid URL:", inputUrl);
    return inputUrl; // Return the original URL if parsing fails
  }
};
