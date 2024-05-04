import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoading, cabins };
}
