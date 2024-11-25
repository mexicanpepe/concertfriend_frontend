import axios from "axios";

const apiUrl = "http://localhost:5001";

export const getArtists = () => {
  return axios.get(`${apiUrl}/artists`);
};

export const getConcerts = () => {
  return axios.get(`${apiUrl}/concerts`);
};

export const getConcertById = (concertId: number) => {
  return axios.get(`${apiUrl}/concerts/${concertId}`);
};

export const createConcert = (concertData: any) => {
  return axios.post(`${apiUrl}/concerts`, concertData);
};

export const updateConcert = (concertData: any) => {
  return axios.put(`${apiUrl}/concerts/${concertData.concert_id}`, concertData);
};

export const deleteConcert = (concertId: number) => {
  return axios.delete(`${apiUrl}/concerts/${concertId}`);
};
