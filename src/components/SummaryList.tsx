import React, { FC } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Summary } from "../utils/fetch";

interface SummaryListProps {
  data: Summary[];
  onBack: (value: boolean) => void;
}

const SummaryList: FC<SummaryListProps> = ({ data, onBack }) => {
  return (
    <Box maxHeight={300} overflow={"scroll"}>
      <IconButton size="small" onClick={() => onBack(false)}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h6" component="h2" mb={2}>
        Saved Summaries
      </Typography>
      <List>
        {data.map((summary, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardHeader
              title={summary.title}
              subheader={summary.source}
              action={
                <Box>
                  {summary.tags?.map((tag, i) => (
                    <Chip
                      key={i + 1}
                      label={tag}
                      sx={{ marginRight: 1, marginBottom: 1 }}
                    />
                  ))}
                </Box>
              }
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {summary.summaryText}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default SummaryList;
