import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import { sendMessageToActiveTab } from "./utils/chromeUtils";

const SuggestButton = styled.button`
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Menu = () => {
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);

  const toggleSuggesting = () => {
    setIsSuggesting(!isSuggesting);
    sendMessageToActiveTab({
      action: "toggleSuggesting",
      isSuggesting: !isSuggesting,
    });
  };

  return (
    <>
      <SuggestButton onClick={toggleSuggesting}>
        {isSuggesting ? "Stop suggesting" : "Start suggesting"}
      </SuggestButton>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>
);
