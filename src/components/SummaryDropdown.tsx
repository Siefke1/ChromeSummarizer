import React, { FC, useState, useContext } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Box } from "@mui/material";

import { fetchNewSummary } from "../utils/fetch";
import AccordionContent from "./AccordionContent";
import { ListenerContext } from "./DropdownWrapper";

interface SummaryDropdownProps {
  selectedText: string | undefined;
}

export const SummaryDropdown: FC<SummaryDropdownProps> = ({
  selectedText,
}) => {
  const [width, setWidth] = useState(200);
  const [expanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false); // for animation
  const [background, setBackground] = useState(Background.TRANSPARENT);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(ListenerContext);

  if (!context) {
    throw new Error("SummaryDropdown must be used within a ListenerContext");
  }

  const { setIsListenerActive } = context;

  const enum Background {
    TRANSPARENT = "transparent",
    WHITE = "white",
  }

  const accordeonClickHandler = () => {
    setExpanded(!expanded);
    if (expanded) {
      setIsListenerActive(true);
      setWidth(200);
      setBackground(Background.TRANSPARENT);
      setShowText(false);
    } else {
      setIsListenerActive(false);
      setWidth(500);
      setBackground(Background.WHITE);
      setTimeout(() => {
        setShowText(true);
      }, 300);
    }
  };

  const summaryHandler = () => {
    if (selectedText) {
      setIsLoading(true);
      fetchNewSummary(selectedText)
        .then((res) => {
          console.log(res);
          setSummaryText(res.choices[0]?.message?.content ?? "");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      setShowSummary(true);
    } else {
      console.log("No text selected");
    }
  };

  return (
    <Container
      style={{ maxWidth: "100%" }}
      disableGutters
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-start"
        height="100vh"
        width="100%"
      >
        <Accordion
          disabled={selectedText === ""}
          sx={{
            position: "fixed",
            background,
            width: width,
            transition: "width 0.3s ease",
            zIndex: 1000001,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="summary-accordion"
            aria-label="summary-accordion"
            id="summary-accordion-header"
            onClick={accordeonClickHandler}
          >
            {!expanded && (
              <Typography variant="subtitle2">Summarize...</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "white",
              width: "80%",
              margin: "0 auto",
            }}
          >
            <AccordionContent
              showForm={showForm}
              showSummary={showSummary}
              isLoading={isLoading}
              selectedText={selectedText ?? "No selection"}
              summaryText={summaryText}
              setShowForm={setShowForm}
              setShowSummary={setShowSummary}
              setSummaryText={setSummaryText}
              onSummarize={summaryHandler}
              showText={showText}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};
