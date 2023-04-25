import axios from "axios";
import {
  fetchNewSummary,
  fetchSummaries,
  saveSummary,
} from "../fetch";
import { getUrl } from "../chromeUtils";

jest.mock("axios");
jest.mock("../chromeUtils");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedGetUrl = getUrl as jest.Mock;

describe("Utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetchNewSummary should call axios.post with the correct data", async () => {
    const chosenText = "sample text";
    await fetchNewSummary(chosenText);
    expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:3000/summarize", { prompt: chosenText });
  });

  it("fetchSummaries should call axios.get", async () => {
    await fetchSummaries();
    expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:3000/summaries");
  });

  it("saveSummary should call axios.post with the correct data", async () => {
    const summaryText = "summary text";
    const originalText = "original text";
    const title = "sample title";
    const tags = ["tag1", "tag2"];
    const currentUrl = "http://example.com";

    mockedGetUrl.mockResolvedValueOnce(currentUrl);

    await saveSummary(summaryText, originalText, title, tags);

    expect(mockedGetUrl).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:3000/summaries", {
      title,
      source: currentUrl,
      summaryText,
      originalText,
      tags,
    });
  });

  it("saveSummary should handle unknown source if getUrl fails", async () => {
    const summaryText = "summary text";
    const originalText = "original text";
    const title = "sample title";
    const tags = ["tag1", "tag2"];

    mockedGetUrl.mockResolvedValueOnce(null);

    await saveSummary(summaryText, originalText, title, tags);

    expect(mockedGetUrl).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:3000/summaries", {
      title,
      source: "unknown source",
      summaryText,
      originalText,
      tags,
    });
  });
});
