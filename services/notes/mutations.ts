import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  NOTES_ADD_MUTATION,
  NOTES_GET_QUERY,
  NOTES_MUTATION,
} from "../queryKeys";
import { Note } from "@/types";
import { isCreatedId } from "@/utils/guards";

const addNote = async (noteColor: string) => {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ color: noteColor }),
  });

  if (!response.ok) throw new Error("Failed to add note");

  const result = await response.json();

  return isCreatedId(result) ? result.id : "";
};

export const useAddNote = (): UseMutationResult<string, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNote,
    mutationKey: [NOTES_MUTATION, NOTES_ADD_MUTATION],
    onMutate: (newNoteColor) => {
      queryClient.cancelQueries({ queryKey: [NOTES_GET_QUERY] });

      const prevNotes =
        queryClient.getQueryData<Note[]>([NOTES_GET_QUERY]) ?? [];

      const newNote: Note = {
        _id: `new-note`,
        created_at: new Date(),
        color: newNoteColor,
        text: "New note",
        username: "",
      };

      const newNotes = [newNote, ...prevNotes,];

      queryClient.setQueryData([NOTES_GET_QUERY], newNotes);

      return { prevNotes };
    },
    onSettled: () => {
      // 500 ms for animate optimistic created note
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [NOTES_GET_QUERY] });
      }, 500)
    },
  });
};
