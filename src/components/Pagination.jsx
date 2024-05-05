import { Button, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <Flex gap={"2"} alignItems={"center"} justifyContent={"center"}>
      <Flex gap={"2"} maxW={"250px"} my="10">
        <Button onClick={() => setPage(page - 1)} isDisabled={page === 1}>
          Prev
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          isDisabled={page === totalPages}
        >
          Next
        </Button>
      </Flex>
      <Flex gap="1">
        <Text>{page}</Text>
        <Text>of</Text>
        <Text>{totalPages}</Text>
      </Flex>
    </Flex>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
