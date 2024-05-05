import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const TMDB_IMAGE_SIZE = "original";

export const TMDB_IMAGE_URL = `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE}`;

// TRENDING
export const getTrending = async ({ time_window = "day" }) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/trending/all/${time_window}?api_key=${TMDB_API_KEY}`
  );
  return data;
};

// MOVIES  & SERIES - Details
export const getDetails = async ({ type, id }) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`
  );
  return data;
};

// MOVIES  & SERIES - Credits
export const getCredits = async ({ type, id }) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/${type}/${id}/credits?api_key=${TMDB_API_KEY}`
  );
  return data;
};

// MOVIES  & SERIES - Trailers
export const getTrailers = async ({ type, id }) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/${type}/${id}/videos?api_key=${TMDB_API_KEY}`
  );
  return data;
};

// MOVIES  & SERIES - Discover
export const getDiscover = async ({ type, page, sort_by }) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=${sort_by}`
  );
  return data;
};

// SEARCH
export const getSearch = async ({ query, page }) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`
  );
  return data;
};
