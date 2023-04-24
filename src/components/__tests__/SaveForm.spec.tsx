import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SaveForm from "../SaveForm";

describe("SaveForm", () => {
  const onSaveMock = jest.fn();
  const onCancelMock = jest.fn();

  beforeEach(() => {
    render(<SaveForm onSave={onSaveMock} onCancel={onCancelMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders input fields and buttons", () => {
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Tags (comma-separated)")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("calls onCancel when the Cancel button is clicked", () => {
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  test("calls onSave with correct arguments when the Save button is clicked", () => {
    const titleInput = screen.getByLabelText("Title");
    const tagsInput = screen.getByLabelText("Tags (comma-separated)");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(tagsInput, { target: { value: "tag1, tag2, tag3" } });
    fireEvent.click(screen.getByText("Save"));

    expect(onSaveMock).toHaveBeenCalledTimes(1);
    expect(onSaveMock).toHaveBeenCalledWith("Test Title", [
      "tag1",
      "tag2",
      "tag3",
    ]);
  });

  test("clears input fields after onSave is called", () => {
    const titleInput = screen.getByLabelText("Title");
    const tagsInput = screen.getByLabelText("Tags (comma-separated)");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(tagsInput, { target: { value: "tag1, tag2, tag3" } });
    fireEvent.click(screen.getByText("Save"));

    expect(titleInput).toHaveValue("");
    expect(tagsInput).toHaveValue("");
  });
});
