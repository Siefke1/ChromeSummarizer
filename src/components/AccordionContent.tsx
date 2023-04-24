import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import React, { FC, useEffect, useState } from "react";
import SaveForm from "./SaveForm";
import SummaryDisplay from "./SummaryDisplay";
import { saveSummary, fetchSummaries } from "../utils/fetch";
import { Summary } from "../utils/fetch";
import SummaryList from "./SummaryList";

interface AccordionContentProps {
  showForm: boolean;
  showSummary: boolean;
  isLoading: boolean;
  selectedText: string;
  summaryText: string;
  setShowForm: (value: boolean) => void;
  setShowSummary: (value: boolean) => void;
  setSummaryText: (value: string) => void;
  onSummarize: () => void;
  showText: boolean;
}

const AccordionContent: FC<AccordionContentProps> = ({
  showForm,
  showSummary,
  isLoading,
  selectedText,
  summaryText,
  setShowForm,
  setShowSummary,
  setSummaryText,
  onSummarize,
  showText,
}) => {
  const [showSummaryList, setShowSummaryList] = useState(false);
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    if (showSummaryList) {
      fetchSummaries().then((res) => {
        console.log(res);
        setSummaries(res);
      });
    }
  }, [showSummaryList]);

  if (showSummaryList) {
    return <SummaryList onBack={setShowSummaryList} data={summaries} />;
  } else if (showForm) {
    return (
      <SaveForm
        onSave={(title, tagsArray) => {
          console.log("Title:", title);
          console.log("Tags:", tagsArray);
          saveSummary(summaryText, selectedText, title, tagsArray);
          setShowForm(false);
          setShowSummary(false);
        }}
        onCancel={() => setShowForm(false)}
      />
    );
  } else if (!showSummary) {
    return (
      <>
        <Box maxHeight={300} overflow={"scroll"} mb={2}>
          <Fade in={showText}>
            <Typography>
              {selectedText ? selectedText : "No text selected"}
            </Typography>
          </Fade>
        </Box>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Button onClick={onSummarize} variant="contained">
            Summarize
          </Button>
          <Button onClick={() => setShowSummaryList(true)} variant="contained">
            Saved Summaries
          </Button>
        </Box>
      </>
    );
  } else {
    return (
      <Box
        maxHeight={300}
        overflow={"scroll"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Fade in={showSummary}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <SummaryDisplay
              summaryText={summaryText}
              onSave={() => setShowForm(true)}
              onCancel={() => {
                setShowSummary(false);
                setSummaryText("");
              }}
            />
          )}
        </Fade>
      </Box>
    );
  }
};

export default AccordionContent;
