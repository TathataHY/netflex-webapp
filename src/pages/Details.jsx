import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "../components";
import useHorizontalDragScroll from "../hooks/useHorizontalDragScroll";
import {
  getCredits,
  getDetails,
  getTrailers,
  TMDB_IMAGE_URL,
} from "../services/api";
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from "../utils/helpers";

export const Details = () => {
  const [loading, setLoading] = useState(false);

  const {
    containerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useHorizontalDragScroll();

  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState({});
  const [trailer, setTrailer] = useState({});
  const [trailers, setTrailers] = useState({});

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const { type, id } = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [detailsData, creditsData, trailersData] = await Promise.all([
          getDetails({ type, id }),
          getCredits({ type, id }),
          getTrailers({ type, id }),
        ]);

        const { results } = trailersData;

        setDetails(detailsData);
        setCredits(creditsData);
        setTrailer(results.find((t) => t.type === "Trailer"));
        setTrailers(results.filter((t) => t.type !== "Trailer").slice(0, 2));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (loading)
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner size={"xl"} color="red" />
      </Flex>
    );

  const handleAddToWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    toast({
      title: "Added to watchlist",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRemoveFromWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    toast({
      title: "Removed from watchlist",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const { cast } = credits;

  return (
    <>
      <Box>
        <Box
          background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${TMDB_IMAGE_URL}${details?.backdrop_path})`}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          w={"100%"}
          h={{ base: "auto", md: "500px" }}
          py={"2"}
          zIndex={"-1"}
          display={"flex"}
          alignItems={"center"}
        >
          <Container maxW={"container.xl"}>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              gap={8}
            >
              <Image
                src={`${TMDB_IMAGE_URL}${details?.poster_path}`}
                alt={details?.title || details?.name}
                objectFit="cover"
                h={"450px"}
              />
              <Box>
                <Heading fontSize={"3xl"}>
                  {details?.title || details?.name}{" "}
                  <Text as="span" fontWeight={"normal"} color={"gray.400"}>
                    {new Date(
                      details?.release_date || details?.first_air_date
                    ).getFullYear()}
                  </Text>
                </Heading>

                <Flex alignItems={"center"} gap={3} mt={4} mb={8}>
                  <Flex alignItems={"center"} gap={2}>
                    <CalendarIcon color={"gray.400"} />
                    <Text fontSize={"sm"} color={"gray.400"}>
                      {new Date(
                        details?.release_date || details?.first_air_date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      (US)
                    </Text>
                  </Flex>
                  {type === "movie" && (
                    <>
                      <Box> | </Box>
                      <Flex alignItems={"center"}>
                        <TimeIcon mr="2" color={"gray.400"} />
                        <Text fontSize={"sm"}>
                          {minutesTohours(details?.runtime)}
                        </Text>
                      </Flex>
                    </>
                  )}
                </Flex>

                <Flex alignItems={"center"} gap={4}>
                  <CircularProgress
                    value={ratingToPercentage(details?.vote_average)}
                    bg={"gray.800"}
                    borderRadius={"full"}
                    p={"0.5"}
                    size={"45px"}
                    color={resolveRatingColor(details?.vote_average)}
                    thickness={"6px"}
                  >
                    <CircularProgressLabel fontSize={"md"}>
                      {ratingToPercentage(details?.vote_average)}
                      <Box as="span" fontSize={"10px"}>
                        %
                      </Box>
                    </CircularProgressLabel>
                  </CircularProgress>

                  {isInWatchlist ? (
                    <Button
                      leftIcon={<CheckCircleIcon />}
                      colorScheme="green"
                      variant={"outline"}
                      size={"sm"}
                      onClick={handleRemoveFromWatchlist}
                    >
                      In watchlist
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<SmallAddIcon />}
                      variant={"outline"}
                      size={"sm"}
                      onClick={handleAddToWatchlist}
                    >
                      Add to watchlist
                    </Button>
                  )}
                </Flex>

                <Text
                  color={"gray.400"}
                  fontSize={"sm"}
                  fontStyle={"italic"}
                  my="5"
                >
                  {details?.tagline}
                </Text>

                <Heading fontSize={"larger"} mb={"3"}>
                  Overview
                </Heading>

                <Text fontSize={"sm"} mb={"3"}>
                  {details?.overview}
                </Text>

                <Flex mt="5" gap="2">
                  {details?.genres?.map((genre) => (
                    <Badge key={genre?.id} p="1">
                      {genre?.name}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Container>
        </Box>

        <Container maxW={"container.xl"} pb="10" position="relative">
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10">
            Cast
          </Heading>
          <Flex
            mt="5"
            mb="10"
            overflow="hidden"
            gap={"5"}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {cast?.length === 0 && (
              <Heading
                as="h3"
                fontSize={"md"}
                textTransform={"uppercase"}
                mt="10"
              >
                No Cast Available
              </Heading>
            )}
            {cast?.map((item) => (
              <Box key={item.id} minW={"150px"}>
                <Image
                  src={`${TMDB_IMAGE_URL}/${item.profile_path}`}
                  w={"100%"}
                  height={"225px"}
                  objectFit={"cover"}
                  borderRadius={"sm"}
                  onDragStart={(e) => e.preventDefault()}
                />
              </Box>
            ))}
          </Flex>

          <Heading
            as="h2"
            fontSize={"md"}
            textTransform={"uppercase"}
            mt="10"
            mb="5"
          >
            Trailers
          </Heading>
          <Video id={trailer?.key} />
          <Flex mt="5" mb="10" overflow={"hidden"} gap={"5"}>
            {trailers.length === 0 && (
              <Heading
                as="h3"
                fontSize={"md"}
                textTransform={"uppercase"}
                mt="10"
              >
                No Trailers Available
              </Heading>
            )}
            {trailers.length > 0 &&
              trailers.map((item) => (
                <Box key={item.id} minW={"290px"}>
                  <Video id={item.key} small />
                  <Text
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    mt="2"
                    noOfLines={2}
                  >
                    {item.name}
                  </Text>
                </Box>
              ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
};
