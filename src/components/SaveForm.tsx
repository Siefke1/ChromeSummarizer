import { Box, Button, TextField } from "@mui/material";
import React, { useState, FC } from "react";

interface SaveFormProps {
  onSave: (title: string, tagsArray: string[]) => void;
  onCancel: () => void;
}

const SaveForm: FC<SaveFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = () => {
    onSave(
      title,
      tags.split(",").map((tag) => tag.trim())
    );
    setTitle("");
    setTags("");
  };

  return (
    <Box>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button onClick={onCancel} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default SaveForm;
