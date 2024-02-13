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

export function getTwoWordRepresentation(userName: string): string {
  const words = userName.split(" ");

  // Get the first letter of the first name (in full caps)
  const firstNameInitial = words[0]?.charAt(0)?.toUpperCase() || "";

  // Get the first letter of the last name (in full caps)
  const lastNameInitial = words.length > 1 ? words[words.length - 1]?.charAt(0)?.toUpperCase() : "";

  // Combine the two initials and return the result
  const result = `${firstNameInitial}${lastNameInitial}`;

  return result;
}

export function openUrlInNewTab(url: string): void {
  // Open the URL in a new tab
  window.open(url, "_blank");
}
