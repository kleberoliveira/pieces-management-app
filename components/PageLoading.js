import React from "react";
import { Box, CircularProgress, Grid } from "@material-ui/core";

export default function PageLoading() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <CircularProgress />
    </Grid>
  );
}
