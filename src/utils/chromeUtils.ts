let popupConnection: chrome.runtime.Port | null = null;

export const handlePopupConnection = () => {
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "popup") {
      popupConnection = port;
      port.onDisconnect.addListener(() => {
        popupConnection = null;
      });
    }
  });
};

export const handleMessageListener = () => {
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === "textSelected") {
      console.log("Selected text:", message.text);
      if (popupConnection) {
        popupConnection.postMessage({
          action: "selectedText",
          text: message.text,
        });
      }
    }
  });
};

export const sendMessageToActiveTab = (message: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, message);
    }
  });
};

export const getActiveTab = (callback: (tab: chrome.tabs.Tab) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    callback(tab);
  });
};

export const handleSelectionChange = (
  isListenerActive: boolean,
  setSelectedText: (selectedText: string) => void
) => {
  if (!isListenerActive) return;
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0).getBoundingClientRect();
    if (range.width > 0 && range.height > 0) {
      setSelectedText(selection.toString().trim());
    }
  }
};

export const handleMessage = (
  message: any,
  sender: any,
  sendResponse: any,
  setIsListenerActive: (isSuggesting: boolean) => void
) => {
  if (message.action === "toggleSuggesting") {
    setIsListenerActive(message.isSuggesting);
  }
};

export const getUrl = (): Promise<string | undefined> => {
  return new Promise((resolve) => {
    resolve(window.location.href);
  });
};
