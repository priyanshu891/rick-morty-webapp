import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import { GET_CHARACTERS_QUERY } from "../graphql/ApolloQueries";

const Characters = ({filter}) => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page, filter },
    
  });


  const characters = data?.characters;
 

  if (loading)
    return (
      <Box
        width="100%"
        height="80%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size="5rem" title="Loading" />
      </Box>
    );
  if (error) return <p>{error.message}</p>;

  const handleChange = (e, p) => {
    console.log(p);
    setPage(p);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container rowSpacing={2} columnSpacing={4} marginY="auto">
          {characters?.results?.map(({ name, image, status, species },index) => {
            const indicatorClass =
              status === "Alive"
                ? "indicator--alive"
                : status === "unknown"
                ? "indicator--unknown"
                : "";

            return (
              <Grid key={index} item xl={4} lg={4} md={6} xs={12} sm={12}>
                <Box component="div" position="relative">
                  <Box
                    position="absolute"
                    component="span"
                    right="0"
                    top="0.5rem"
                  >
                    <Tooltip title={status}>
                      <div className={`indicator ${indicatorClass}`}></div>
                    </Tooltip>
                  </Box>
                  <Card>
                    <Box sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        image={image}
                        height="200px"
                        width="200px"
                        sx={{ objectFit: "fill", maxWidth: "200px" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <b>Species: </b> {species}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="2rem"
        >
          <Pagination
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            page={page}
            count={characters?.info?.pages}
            siblingCount={2}
          />
        </Box>
      </Container>
    </>
  );
};

export default Characters;
