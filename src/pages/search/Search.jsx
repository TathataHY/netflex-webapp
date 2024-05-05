import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MovieCard, Pagination, SkeletonMovieCard } from "../../components";
import { getSearch } from "../../services/api";

export const Search = () => {
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    setLoading(true);
    getSearch({ query, page })
      .then(setSearchResults)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query, page]);

  if (loading)
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner size={"xl"} color="red" />
      </Flex>
    );

  const { results, total_pages } = searchResults;

  return (
    <Container maxW={"container.xl"}>
      <Flex gap={8} alignItems={"baseline"} my={8}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Search
        </Heading>
      </Flex>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <Input
          placeholder="Search for movies or tv shows"
          _placeholder={{ color: "gray.100" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {results?.length === 0 && (
        <Heading
          as="h3"
          fontSize={"sm"}
          mt="10"
          height="65vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          No results found
        </Heading>
      )}

      {loading && <SkeletonMovieCard />}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
        mt={8}
      >
        {results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>

      {results?.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPages={total_pages} />
      )}
    </Container>
  );
};
