import React, { useState, useEffect, FC } from "react";

import { SummaryDropdown } from "./SummaryDropdown";
import { handleSelectionChange, handleMessage } from "../utils/chromeUtils";
import { createContext } from "react";

interface ListenerContextType {
  isListenerActive: boolean;
  setIsListenerActive: (value: boolean) => void;
}

export const ListenerContext = createContext<ListenerContextType | null>(null);

const DropdownWrapper: FC = () => {
  const [isListenerActive, setIsListenerActive] = useState(true);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const wrappedHandleMessage = (
      message: any,
      sender: any,
      sendResponse: any
    ) => {
      handleMessage(message, sender, sendResponse, setIsListenerActive);
    };

    chrome.runtime.onMessage.addListener(wrappedHandleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(wrappedHandleMessage);
    };
  }, []);

  useEffect(() => {
    const wrappedHandleSelectionChange = () => {
      handleSelectionChange(isListenerActive, setSelectedText);
    };

    document.addEventListener("selectionchange", wrappedHandleSelectionChange);

    return () => {
      document.removeEventListener(
        "selectionchange",
        wrappedHandleSelectionChange
      );
    };
  }, [isListenerActive, setSelectedText]);

  return (
    <ListenerContext.Provider
      value={{ isListenerActive, setIsListenerActive }}
    >
      <SummaryDropdown selectedText={selectedText} />
    </ListenerContext.Provider>
  );
};

export default DropdownWrapper;
