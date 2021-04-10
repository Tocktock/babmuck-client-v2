import useSWR from "swr";
import fetcher from "../fetcher";

function useRooms() {
  const { data, error } = useSWR("http://localhost:8080/room/", fetcher);

  return {
    rooms: data ? data : null,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useRooms;
