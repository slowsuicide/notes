import React, { useState } from "react";
import NoteFunction from "./NoteFunction";
import { ACTION_VALUES } from "./NoteParams";
import editNoteImage from "../assets/img/editNote.png";
import saveNoteImage from "../assets/img/saveNote.png";
import deleteNoteImage from "../assets/img/deleteNote.png";
import showDetailsImage from "../assets/img/showDetails.png";
import hideDetailsImage from "../assets/img/hideDetails.png";
import { INote, ISubNote, INoteProps, INoteFunctions } from "../models";
import { usePageVersionContext } from "./context/VersionProvider";

export default function Note(props: INoteProps) {
  const note = props.note;
  const [noteOnEdit, setNoteOnEdit] = useState<boolean>(false);
  const versionInfo = usePageVersionContext();

  if (!note) return <></>;

  const noteFuncType: string = note.hasOwnProperty("parentId")
    ? ACTION_VALUES.SUBACTION
    : ACTION_VALUES.ACTION;
  //noteFunctions - возможные функции взаимодействия с заметкой
  let noteFunctions: INoteFunctions[] = [
    {
      name: noteFuncType,
      img: saveNoteImage,
      type: ACTION_VALUES.SAVE,
      func: () => onNoteFunctionClick(ACTION_VALUES.EDIT),
    },
    {
      name: noteFuncType,
      img: editNoteImage,
      type: ACTION_VALUES.EDIT,
      func: () => onNoteFunctionClick(ACTION_VALUES.EDIT),
    },
    {
      name: noteFuncType,
      img: deleteNoteImage,
      type: ACTION_VALUES.DELETE,
      func: () => onNoteFunctionClick(ACTION_VALUES.DELETE),
    },
  ];

  //headerStyles отображает, завершённая ли задача в заметке или нет. Присваивает соответствующий стиль
  const headerStyles = [
    props.currNote === props.note ? "current" : "",
    note.completed ? "completed" : "",
  ];
  return (
    <div className="note">
      {!note.hasOwnProperty("parentId") && (
        <div
          className={note.showDetails ? "hideDetails" : "showDetails"}
          onClick={() => props.onChangeNote(onDetailBTNClick)}
        >
          <img src={note.showDetails ? hideDetailsImage : showDetailsImage} />
        </div>
      )}
      {!noteOnEdit && (
        <input
          type="checkbox"
          checked={note.completed}
          onChange={() => props.onChangeNote(onChangeNoteState)}
        />
      )}
      {!noteOnEdit ? (
        <span
          className={headerStyles.join(" ")}
          onClick={() => {
            if (props.onChangeCurrNote)
              props.onChangeCurrNote(() => {
                return note;
              });
            if (versionInfo.toggle) versionInfo.toggle("description");
          }}
        >
          {note.header}
        </span>
      ) : (
        <input
          type="text"
          value={note.header}
          onChange={(e) => onChangeHeader(e.target.value)}
        />
      )}

      <div className="noteActions">
        {noteFunctions.map((el, index) => {
          if (
            (noteOnEdit && el.type === ACTION_VALUES.EDIT) ||
            (!noteOnEdit && el.type === ACTION_VALUES.SAVE) ||
            (note.completed && el.type !== ACTION_VALUES.DELETE)
          )
            return;
          else return <NoteFunction key={index} info={el} />;
        })}
      </div>
    </div>
  );

  function onChangeNoteState(notes: INote[]): INote[] {
    return notes.map((el: INote | ISubNote) => {
      if (note && note.hasOwnProperty("parentId")) {
        if (!el.subnotes) el.subnotes = [];

        el.subnotes.map((subnote: ISubNote) => {
          if (subnote.id === note.id && subnote.parentId === note.parentId)
            subnote.completed = !subnote.completed;
          return subnote;
        });
      } else if (note && el.id === note.id) el.completed = !el.completed;

      return el;
    });
  }

  function onDetailBTNClick(notes: INote[]): INote[] {
    return notes.map((el: INote | ISubNote) => {
      if (note && el.id === note.id) {
        el.showDetails = !el.showDetails;
      }
      return el;
    });
  }

  function onChangeHeader(newHeader: string): void {
    props.onChangeNote((notes: INote[] | ISubNote[]) => {
      return notes.map((el: INote | ISubNote) => {
        if (note && note.hasOwnProperty("parentId")) {
          if (el.subnotes)
            el.subnotes.map((subnote: ISubNote) => {
              if (subnote.id === note.id && subnote.parentId === note.parentId)
                subnote.header = newHeader;
              return subnote;
            });
        } else if (note && el.id === note.id) el.header = newHeader;

        return el;
      });
    });
  }

  function onNoteFunctionClick(action: string): void {
    if (action === ACTION_VALUES.EDIT) {
      editNote();
      return;
    }

    if (action === ACTION_VALUES.DELETE) {
      deleteNote();
      return;
    }
  }

  function editNote(): void {
    setNoteOnEdit(!noteOnEdit);
  }

  function deleteNote(): void {
    if (note)
      props.onChangeNote((notes: INote[] | ISubNote[]) => {
        return notes
          .filter((el: INote | ISubNote) => {
            if (
              note.hasOwnProperty("parentId") &&
              el.id === note.parentId &&
              el.subnotes
            ) {
              el.subnotes = el.subnotes.filter(
                (subnote: ISubNote) => subnote.id !== note.id
              );
              return el;
            } else return el.id !== note.id;
          })
          .map((el: INote | ISubNote) => {
            if (el.hasOwnProperty("parentId")) return el;
            else {
              if (el.subnotes && el.hasDetails && el.subnotes.length === 0) {
                el.hasDetails = !el.hasDetails;
                return el;
              } else return el;
            }
          });
      });
  }
}
