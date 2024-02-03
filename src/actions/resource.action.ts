"use server";
import axios, { AxiosError } from "axios";
import cheerio from "cheerio";

export async function fetchResourceData(url: string) {
  try {
    const response = await axios.get(url);

    // Load HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract page title
    const title = $("title").text();

    // Extract meta description
    const description = $('meta[name="description"]').attr("content") || "";

    // Extract og:image URL
    const ogImageUrl = $('meta[property="og:image"]').attr("content") || "";

    return {
      title,
      description,
      ogImageUrl,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error("Could not fetch data from that URL");
    }
    throw err;
  }
}
