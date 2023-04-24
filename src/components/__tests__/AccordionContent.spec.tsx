import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AccordionContent from "../AccordionContent";

describe("AccordionContent", () => {
  const defaultProps = {
    showForm: false,
    showSummary: false,
    isLoading: false,
    selectedText: "",
    summaryText: "",
    setShowForm: jest.fn(),
    setShowSummary: jest.fn(),
    setSummaryText: jest.fn(),
    onSummarize: jest.fn(),
    showText: false,
  };

  it("renders without crashing", () => {
    render(<AccordionContent {...defaultProps} />);
  });

  it("displays selected text when provided", () => {
    const selectedText = "This is some selected text.";
    render(
      <AccordionContent
        {...defaultProps}
        selectedText={selectedText}
        showText
      />
    );
    expect(screen.getByText(selectedText)).toBeInTheDocument();
  });

  it("displays 'No text selected' when no text is selected", () => {
    render(<AccordionContent {...defaultProps} showText />);
    expect(screen.getByText("No text selected")).toBeInTheDocument();
  });

  it("renders 'Summarize' and 'Saved Summaries' buttons when not showing a summary", () => {
    render(<AccordionContent {...defaultProps} />);
    expect(screen.getByText("Summarize")).toBeInTheDocument();
    expect(screen.getByText("Saved Summaries")).toBeInTheDocument();
  });

  it("calls onSummarize when 'Summarize' button is clicked", () => {
    render(<AccordionContent {...defaultProps} />);
    fireEvent.click(screen.getByText("Summarize"));
    expect(defaultProps.onSummarize).toHaveBeenCalled();
  });

  it("displays CircularProgress when isLoading is true", () => {
    render(<AccordionContent {...defaultProps} showSummary isLoading />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
