import { isAllOf } from "@reduxjs/toolkit";
import useSWR from "swr";
import fetcher from "../fetcher";

interface Props {
  roomName: string;
}

function useRoom(props: Props) {
  const { data, error } = useSWR(
    `http://localhost:8080/room/${props.roomName}`,
    fetcher
  );

  return {
    room: data ? data : null,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useRoom;
