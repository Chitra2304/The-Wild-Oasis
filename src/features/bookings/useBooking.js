import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    onError: (error) => {
      toast.error(error.message);
    },
    retry: false,
  });
  return { isLoading, booking };
}
