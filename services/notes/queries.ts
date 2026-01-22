import { isNotesResponse } from "@/utils/guards";
import { useQuery } from "@tanstack/react-query";
import { NOTES_GET_QUERY } from "../queryKeys";

const getNotes = async () => {
  const response = await fetch("/api/notes");

  if (!response.ok) throw new Error("Failed to get notes");

  const result = await response.json();

  return isNotesResponse(result) ? result.notes : [];
};

export const useGetNotes = () =>
  useQuery({ queryKey: [NOTES_GET_QUERY], queryFn: getNotes });
