import { axiosInstance } from "@/app/api/api";
import { useEffect, useState } from "react";
import "react-multi-date-picker/styles/colors/teal.css";
import ReservationsTable, {
  Reservation,
} from "../ReservationsTable/ReservationsTable";
import DeleteConfirmDialog from "../../DeleteConfirmDialog/DeleteConfirmDialog";

const Reservations = () => {
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

  const handleDelete = async (reservationId: number) => {
    try {
      await axiosInstance.delete(`/reservation/undo/${reservationId}`);
      fetchReservations(); // Refresh the reservations list after deletion
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleDeleteClick = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setIsDialogOpen(true);
  };

  return (
    <>
      <ReservationsTable
        reservations={reservations}
        onDeleteClick={handleDeleteClick}
      />
      <DeleteConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          if (selectedReservationId) {
            handleDelete(selectedReservationId);
            setSelectedReservationId(null);
            setIsDialogOpen(false);
          }
        }}
      />
    </>
  );
};

export default Reservations;
