import axios from "axios";
import { CreateChatCompletionResponse } from "openai";
import { getUrl } from "./chromeUtils";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export type Summary = {
  title: string;
  source: string;
  summaryText: string;
  originalText: string;
  tags?: string[];
};

export const fetchNewSummary = async (
  chosenText: string
): Promise<CreateChatCompletionResponse> => {
  const response = await axios.post(`${BACKEND_URL}/summarize`, {
    prompt: chosenText,
  });

  return response.data;
};

export const fetchSummaries = async (): Promise<Summary[]> => {
  const response = await axios.get(`${BACKEND_URL}/summaries`);
  return response.data;
};

export const saveSummary = async (
  summaryText: string,
  originalText: string,
  title: string,
  tags?: string[]
) => {
  const currentUrl = await getUrl();

  const summaryObject = {
    title,
    source: currentUrl ?? "unknown source",
    summaryText,
    originalText,
    tags,
  };

  try {
    const response = await axios.post(
      `${BACKEND_URL}/summaries`,
      summaryObject
    );

    console.log("Summary saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving summary:", error);
  }
};
