import useSWR from "swr";
import fetcher from "../fetcher";

function useRoomList() {
  const { data, error } = useSWR("http://localhost:8080/room/all", fetcher, {
    refreshInterval: 2000,
  });

  return {
    rooms: data ? data : null,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useRoomList;
