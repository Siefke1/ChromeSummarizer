import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SummaryList from "../SummaryList";

describe("SummaryList", () => {
  const testData = [
    {
      id: "1",
      title: "Sample Title 1",
      source: "Sample Source 1",
      originalText: "Sample original Text 1",
      summaryText: "Sample Summary Text 1",
      tags: ["tag1", "tag2"],
    },
    {
      title: "Sample Title 2",
      source: "Sample Source 2",
      originalText: "Sample original Text 2",
      summaryText: "Sample Summary Text 2",
      tags: ["tag3", "tag4"],
    },
  ];

  const onBackMock = jest.fn();

  beforeEach(() => {
    render(<SummaryList data={testData} onBack={onBackMock} />);
  });

  it("renders the component without crashing", () => {
    expect(screen.getByText("Saved Summaries")).toBeInTheDocument();
  });

  it("renders the list of summaries", () => {
    expect(screen.getByText("Sample Title 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Title 2")).toBeInTheDocument();
  });

  it("calls the onBack function when back button is clicked", () => {
    fireEvent.click(screen.getByRole("button"));
    expect(onBackMock).toHaveBeenCalled();
  });
});
