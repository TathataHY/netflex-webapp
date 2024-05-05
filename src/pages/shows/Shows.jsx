import { Container, Flex, Grid, Heading, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MovieCard, Pagination, SkeletonMovieCard } from "../../components";
import { getDiscover } from "../../services/api";

export const Shows = () => {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [shows, setShows] = useState({});

  useEffect(() => {
    setLoading(true);
    getDiscover({ type: "tv", page, sort_by: sortBy })
      .then(setShows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, sortBy]);

  const { results, total_pages } = shows;

  results?.forEach((result) => {
    result.media_type = "tv";
  });

  return (
    <Container maxW={"container.xl"}>
      <Flex gap={8} alignItems={"baseline"} my={8}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Discover TV Shows
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

      <Pagination page={page} setPage={setPage} totalPages={total_pages} />
    </Container>
  );
};
