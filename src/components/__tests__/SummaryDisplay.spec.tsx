import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SummaryDisplay from "../SummaryDisplay";

describe("SummaryDisplay", () => {
  const onCancelMock = jest.fn();
  const onSaveMock = jest.fn();
  const summaryText = "This is a sample summary text.";

  const clipboardWriteTextMock = jest.fn();

  beforeEach(() => {
    render(
      <SummaryDisplay
        summaryText={summaryText}
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />
    );
  });

  it("renders the summary text", () => {
    expect(screen.getByText(summaryText)).toBeInTheDocument();
  });

  it("renders the buttons", () => {
    expect(screen.getByText("Thank you.")).toBeInTheDocument();
    expect(screen.getByText("Save.")).toBeInTheDocument();
    expect(screen.getByLabelText("copy-to-clipboard")).toBeInTheDocument();
  });

  it('calls onCancel when the "Thank you." button is clicked', () => {
    fireEvent.click(screen.getByText("Thank you."));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSave when the "Save." button is clicked', () => {
    fireEvent.click(screen.getByText("Save."));
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it("copies the summary text to the clipboard when the copy icon is clicked", () => {
    Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: clipboardWriteTextMock,
        },
        writable: true,
        configurable: true,
      });
    fireEvent.click(screen.getByLabelText("copy-to-clipboard"));
    expect(clipboardWriteTextMock).toHaveBeenCalledWith(summaryText);
    clipboardWriteTextMock.mockClear();
  });
});
