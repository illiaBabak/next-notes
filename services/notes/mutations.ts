import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import {
  NOTES_ADD_MUTATION,
  NOTES_DELETE_MUTATION,
  NOTES_EDIT_MUTATION,
  NOTES_GET_QUERY,
  NOTES_MUTATION,
} from '../queryKeys';
import { Note } from '@/types';
import { isCreatedId } from '@/utils/guards';
import { NOTE_COLORS } from '@/utils/constants';

const addNote = async (noteColor: string) => {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ color: noteColor }),
  });

  if (!response.ok) throw new Error('Failed to add note');

  const result = await response.json();

  return isCreatedId(result) ? result.id : '';
};

const editNote = async (note: Partial<Note>) => {
  const response = await fetch(`/api/notes/${note._id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });

  if (!response.ok) throw new Error('Failed to edit note');
};

const deleteNote = async (id: string) => {
  const response = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete note');
};

export const useAddNote = (): UseMutationResult<string, Error, (typeof NOTE_COLORS)[number]> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNote,
    mutationKey: [NOTES_MUTATION, NOTES_ADD_MUTATION],
    onMutate: async (newNoteColor: (typeof NOTE_COLORS)[number]) => {
      await queryClient.cancelQueries({ queryKey: [NOTES_GET_QUERY] });

      const prevNotes = queryClient.getQueryData<Note[]>([NOTES_GET_QUERY]) ?? [];

      const newNote: Note = {
        _id: `new-note`,
        created_at: new Date(),
        color: newNoteColor,
        text: 'New note',
        username: '',
      };

      const newNotes = [newNote, ...prevNotes];

      queryClient.setQueryData([NOTES_GET_QUERY], newNotes);

      return { prevNotes };
    },
    onSettled: () => {
      // 500 ms for animate optimistic created note
      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: [NOTES_GET_QUERY] });
      }, 360);
    },
  });
};

export const useEditNote = (): UseMutationResult<void, Error, Partial<Note>> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [NOTES_MUTATION, NOTES_EDIT_MUTATION],
    mutationFn: editNote,
    onMutate: async (noteToEdit) => {
      await queryClient.cancelQueries({ queryKey: [NOTES_GET_QUERY] });

      const prevNotes = queryClient.getQueryData<Note[]>([NOTES_GET_QUERY]) ?? [];

      const editedNotes = prevNotes.map((note) =>
        note._id === noteToEdit._id ? { ...noteToEdit, note } : note
      );

      queryClient.setQueryData([NOTES_GET_QUERY], editedNotes);

      return { prevNotes };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [NOTES_GET_QUERY] });
    },
  });
};

export const useDeleteNote = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [NOTES_MUTATION, NOTES_DELETE_MUTATION],
    mutationFn: deleteNote,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [NOTES_GET_QUERY] });

      const prevNotes = queryClient.getQueryData<Note[]>([NOTES_GET_QUERY]) ?? [];

      const filteredNotes = prevNotes.filter((note) => note._id !== id);

      queryClient.setQueryData([NOTES_GET_QUERY], filteredNotes);

      return { prevNotes };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [NOTES_GET_QUERY] });
    },
  });
};
