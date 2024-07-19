import { Quotes } from "@prisma/client";

export function getQuoteOfTheDay(quotes:Quotes[]) {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
  const diff = currentDate.getTime() - startOfYear.getTime(); // Convert to milliseconds
  const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in a day
  const dayOfYear = Math.floor(diff / oneDay); // Calculate the day of the year
  const index = dayOfYear % quotes.length; // Calculate the index
  return quotes[index];
  }
  