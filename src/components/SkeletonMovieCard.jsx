import { Grid, Skeleton } from "@chakra-ui/react";

export const SkeletonMovieCard = () => (
  <Grid
    templateColumns={{
      base: "repeat(1, 1fr)",
      sm: "repeat(2, 1fr)",
      md: "repeat(4, 1fr)",
      lg: "repeat(5, 1fr)",
    }}
    gap={6}
  >
    {[...Array(20)].map((_, index) => (
      <Skeleton key={index} height="300px" width="100%" />
    ))}
  </Grid>
);
