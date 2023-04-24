import { Box, Button, IconButton, Typography } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import React, { FC } from "react";

interface SummaryDisplayProps {
  summaryText: string;
  onSave: () => void;
  onCancel: () => void;
}

const SummaryDisplay: FC<SummaryDisplayProps> = ({
  summaryText,
  onSave,
  onCancel,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <Box margin={"0 auto"}>
      <Typography sx={{ marginBottom: 10 }}>{summaryText}</Typography>
      <IconButton onClick={handleCopy} aria-label="copy-to-clipboard">
        <FileCopyIcon />
      </IconButton>
      <Box display="flex" justifyContent="space-between">
        <Button
          onClick={onCancel}
          variant="contained"
          aria-label="discard-summary"
        >
          Thank you.
        </Button>
        <Button onClick={onSave} variant="contained" aria-label="save-summary">
          Save.
        </Button>
      </Box>
    </Box>
  );
};
export default SummaryDisplay;
