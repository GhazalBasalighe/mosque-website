import { axiosInstance } from "@/app/api/api";
import { useEffect, useState } from "react";
import "react-multi-date-picker/styles/colors/teal.css";
import ReservationsTable, {
  Reservation,
} from "../ReservationsTable/ReservationsTable";

const Reservations = () => {
  const [description, setDescription] = useState<string>("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);

  const fetchReservations = async () => {
    try {
      const response = await axiosInstance.get("/reservation");
      setReservations(response.data.data);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);
  {
    /* <DeleteConfirmDialog
    isOpen={isDialogOpen}
    onClose={() => setIsDialogOpen(false)}
    onConfirm={() => {
      if (selectedReservationId) {
        handleDelete(selectedReservationId);
        setSelectedReservationId(null);
        setIsDialogOpen(false);
      }
    }}
  /> */
  }

  return <ReservationsTable reservations={reservations} />;
};

export default Reservations;
