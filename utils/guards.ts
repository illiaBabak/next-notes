import { CreatedId, Note, NotesResponse } from "../types";

export const isString = (data: unknown): data is string =>
  typeof data === "string";

export const isNumber = (data: unknown): data is number =>
  typeof data === "number";

export const isBoolean = (data: unknown): data is boolean =>
  typeof data === "boolean";

export const isNote = (data: unknown): data is Note => {
  return (
    typeof data === "object" &&
    data !== null &&
    "_id" in data &&
    "created_at" in data &&
    "username" in data &&
    "color" in data &&
    "text" in data &&
    isString(data._id) &&
    isString(data.created_at) &&
    isString(data.username) &&
    isString(data.color) &&
    isString(data.text)
  );
};

export const isNoteArray = (data: unknown): data is Note[] =>
  Array.isArray(data) && data.every(isNote);

export const isNotesResponse = (data: unknown): data is NotesResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "notes" in data &&
    isNoteArray(data.notes)
  );
};

export const isCreatedId = (data: unknown): data is CreatedId => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    isString(data.id)
  );
};
