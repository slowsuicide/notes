import React, { useState } from "react";
import { INote, ISubNote } from "./models";
import MainNotes from "./components/MainNotes";
import NoteInfo from "./components/noteInfo/NoteInfo";
import { CNT_NOTES_TO_LOAD } from "./components/NoteParams";
import "./styles/css/style.css";
import { usePageVersionContext } from "./components/context/VersionProvider";

export default function App() {
  const versionInfo = usePageVersionContext();
  console.log(versionInfo);
  const storedNotes = localStorage.getItem("notes");
  const localNotes: INote[] =
    storedNotes === null
      ? []
      : JSON.parse(storedNotes).slice(0, CNT_NOTES_TO_LOAD - 1);
  const [notes, setNotes] = useState<INote[] | []>(localNotes);
  const [currNote, setCurrNote] = useState<INote | ISubNote | undefined>(
    undefined
  );

  function onChangeNote(func: (notes: INote[] | ISubNote[]) => INote[]) {
    //Мы передаём некоторую функцию, которая принимает в себя массив заметок, изменяет его по своим правилам и возвращает измененный массив.
    const newNotesList = func(notes);
    const storedNotes = localStorage.getItem("notes");
    //Производим сохранение в локальное хранилище
    const allStorageNotes = storedNotes ? JSON.parse(storedNotes) : [];
    allStorageNotes.splice(0, newNotesList.length, ...newNotesList);
    localStorage.setItem(
      "notes",
      JSON.stringify(
        allStorageNotes.length > newNotesList.length
          ? newNotesList
          : allStorageNotes
      )
    );
    setNotes(newNotesList);
  }

  function onChangeCurrNote(
    func:
      | INote
      | ISubNote
      | undefined
      | ((note: INote | ISubNote | undefined) => INote | ISubNote)
  ) {
    setCurrNote(func);
  }
  /* MainNotes - отрисовка блока заметок
  NoteInfo - отрисовка заголовка заметки и тела*/
  return (
    <>
      {versionInfo &&
        ((versionInfo.version === "mobile" && versionInfo.window === "main") ||
          versionInfo.version === "desktop") && (
          <MainNotes
            currNote={currNote}
            notes={notes}
            onChangeCurrNote={onChangeCurrNote}
            onChangeNote={onChangeNote}
          />
        )}
      {versionInfo &&
        ((versionInfo.version === "mobile" &&
          versionInfo.window === "description") ||
          versionInfo.version === "desktop") && (
          <NoteInfo note={currNote} onChangeNote={onChangeNote} />
        )}
    </>
  );
}
