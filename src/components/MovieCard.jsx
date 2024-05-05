import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TMDB_IMAGE_URL } from "../services/api";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/${movie.media_type}/${movie.id}`}>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)", md: "scale(1.08)" },
          transition: "transform 0.2s ease-in-out",
          zIndex: "10",
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
          alt={movie.title || movie.name}
          objectFit={"cover"}
          w={"100%"}
          h={"100%"}
        />
        <Box
          className={"overlay"}
          position={"absolute"}
          p={2}
          bottom={0}
          left={0}
          w={"100%"}
          h={"33%"}
          bg={"rgba(0,0,0,0.9)"}
          opacity={0}
          transition={"opacity 0.3s ease-in-out"}
          color={"white"}
        >
          <Text textAlign={"center"}>{movie.title || movie.name}</Text>
          <Text textAlign={"center"} fontSize={"x-small"} color={"green.200"}>
            {new Date(
              movie.release_date || movie.first_air_date
            ).getFullYear() || "N/A"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"} gap={2} mt="4">
            <StarIcon fontSize={"small"} />
            <Text>{movie.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object,
};
