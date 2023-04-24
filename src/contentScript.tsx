// SummaryModal.tsx
import React from "react";
import ReactDOM from "react-dom";
import DropdownWrapper from "./components/DropdownWrapper";

const SummaryModal = () => {
  return <DropdownWrapper />;
};

const rootElement = document.createElement("div");
rootElement.style.position = "fixed";
rootElement.style.top = "0";
rootElement.style.right = "0";
rootElement.style.zIndex = "999999";
document.body.appendChild(rootElement);

ReactDOM.render(<SummaryModal />, rootElement);
