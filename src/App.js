import React, { useState } from "react";
import MainNotes from "./components/MainNotes";
import NoteInfo from "./components/noteInfo/NoteInfo";
import { CNT_NOTES_TO_LOAD } from "./components/NoteParams";
import "./styles/css/style.css";

export default function Page() {
  const localNotes =
    JSON.parse(localStorage.getItem("notes")) === null
      ? []
      : JSON.parse(localStorage.getItem("notes")).slice(0,CNT_NOTES_TO_LOAD-1);
  const [notes, setNotes] = useState(localNotes);

  const [currNote, setCurrNote] = useState("");



  function onChangeNote(func) {
    //Мы передаём некоторую функцию, которая принимает в себя массив заметок, изменяет его по своим правилам и возвращает измененный массив.
    const newNotesList = func(notes)

    //Производим сохранение в локальное хранилище
    const allStorageNotes = JSON.parse(localStorage.getItem('notes')) || [];
    allStorageNotes.splice(0,newNotesList.length,...newNotesList)

    localStorage.setItem('notes',JSON.stringify(allStorageNotes.length<newNotesList.length ? newNotesList : allStorageNotes));
    setNotes(newNotesList);
  }

  function onChangeCurrNote(func) {
    setCurrNote(func);
  }
  /* MainNotes - отрисовка блока заметок
  NoteInfo - отрисовка заголовка заметки и тела*/
  return (
    <React.Fragment>
      <MainNotes
        currNote={currNote}
        notes={notes}
        onChangeCurrNote={onChangeCurrNote}
        onChangeNote={onChangeNote}
      />
      <NoteInfo note={currNote} onChangeNote={onChangeNote} />
    </React.Fragment>
  );
}
