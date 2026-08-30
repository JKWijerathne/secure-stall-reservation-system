import api from "./api";

const getAllStalls = () => {
  return api.get("/stalls");
};

const reserveStalls = (stallIds) => {
  return api.post("/reservations", { stallIds });
};

const getReservationCount = () => {
  return api.get("/reservations/count");
};

const getMyReservations = () => {
  return api.get("/reservations/my");
};

const cancelReservation = (stallId) => {
  return api.delete(`/reservations/${stallId}`);
};

const StallService = {
  getAllStalls,
  reserveStalls,
  getReservationCount,
  getMyReservations,
  cancelReservation,
};

export default StallService;