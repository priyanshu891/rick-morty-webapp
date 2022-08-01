import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Box
      minHeight="40vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src={require("../assets/morty.png")} alt="Resource Not Found" />
      <Typography variant="h3">Not Found!!</Typography>
    </Box>
  );
};

export default NotFound;
