import { Container, Flex, Grid, Heading, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MovieCard, Pagination, SkeletonMovieCard } from "../../components";
import { getDiscover } from "../../services/api";

export const Movies = () => {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [movies, setMovies] = useState({});

  useEffect(() => {
    setLoading(true);
    getDiscover({ type: "movie", page, sort_by: sortBy })
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, sortBy]);

  const { results, total_pages } = movies;

  results?.forEach((result) => {
    result.media_type = "movie";
  });

  return (
    <Container maxW={"container.xl"}>
      <Flex gap={8} alignItems={"baseline"} my={8}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>

        <Select
          w={"130px"}
          onChange={(e) => {
            setPage(1);
            setSortBy(e.target.value);
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
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

      <Pagination page={page} totalPages={total_pages} setPage={setPage} />
    </Container>
  );
};
