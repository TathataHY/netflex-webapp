import { Box, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { useEffect, useState } from "react";
import { MovieCard, SkeletonMovieCard } from "../components";
import { getTrending } from "../services/api";

export const Home = () => {
  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    setLoading(true);
    getTrending({ time_window: timeWindow })
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [timeWindow]);

  const { results } = movies;

  return (
    <Container maxW={"container.xl"}>
      <Flex gap={8} alignItems={"baseline"} my={8}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex
          gap={3}
          alignItems={"center"}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >
          <Box
            as={"button"}
            px={3}
            py={1}
            bg={
              timeWindow === "day"
                ? mode("teal.400", "gray.800")
                : "transparent"
            }
            borderRadius={"20px"}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as={"button"}
            px={3}
            py={1}
            bg={
              timeWindow === "week"
                ? mode("teal.400", "gray.800")
                : "transparent"
            }
            borderRadius={"20px"}
            onClick={() => setTimeWindow("week")}
          >
            Week
          </Box>
        </Flex>
      </Flex>

      {loading && <SkeletonMovieCard />}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Container>
  );
};
