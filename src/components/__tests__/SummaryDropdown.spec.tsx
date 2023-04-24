import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SummaryDropdown } from "../SummaryDropdown";
import { ListenerContext } from "../DropdownWrapper";

describe("SummaryDropdown", () => {
  const selectedText = "This is a sample text.";
  const setIsListenerActive = jest.fn();

  beforeEach(() => {
    render(
      <ListenerContext.Provider
        value={{ isListenerActive: true, setIsListenerActive }}
      >
        <SummaryDropdown selectedText={selectedText} />
      </ListenerContext.Provider>
    );
  });

  it("renders the component without crashing", () => {
    expect(screen.getByText("Summarize...")).toBeInTheDocument();
  });

  it("expands the accordion when the summary button is clicked", () => {
    fireEvent.click(screen.getByText("Summarize..."));
    expect(screen.getByText(selectedText)).toBeInTheDocument();
  });

  it("collapses the accordion when the summary button is clicked again", () => {
    fireEvent.click(screen.getByText("Summarize..."));
    fireEvent.click(screen.getByLabelText("summary-accordion"));
    expect(screen.getByText("Summarize...")).toBeInTheDocument();
  });
});
