export const CNT_NOTES_TO_LOAD = 20;

export const ACTION_VALUES = {
  ACTION: "action",
  SUBACTION: "subaction",
  ADD: "add",
  SAVE: "save",
  EDIT: "edit",
  DELETE: "delete",
};

export const NOTE_MAIN_TEMPLATE = {
  id: 0,
  completed: false,
  showDetails: false,
  header: "",
  description: "",
  subnotes: [],
};

export const NOTE_DETAIL_TEMPLATE = {
  parentId: 0,
  id: 0,
  completed: false,
  showDetails: false,
  header: "",
  description: "",
};
