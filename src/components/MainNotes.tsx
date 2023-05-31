import React from "react";
import Note from "./Note";
import NewNote from "./NewNote";
import { ACTION_VALUES, CNT_NOTES_TO_LOAD } from "./NoteParams";
import MainNoteWithDetails from "./MainNoteWithDetails";
import {INote,ISubNote,INoteProps} from '../models'





export default function MainNotes(props: INoteProps) {
  //MainNotesWithDetails - отрисовывает главную заметку с имеющейся вложенностью
  //Notes - структура самой заметки
  const notes = props.notes || [];

  return (
    <section className="mainNotes">
      <div className="notesList" onScroll={(e) => onNotesListScroll(e)}>
        {notes.map((el:INote|ISubNote, index:number) => {
          if (el.showDetails) {
            return (
              <MainNoteWithDetails
                currNote={props.currNote}
                note={el}
                key={index}
                onChangeCurrNote={props.onChangeCurrNote}
                onChangeNote={props.onChangeNote}
              />
            );
          } else
            return (
              <Note
                currNote={props.currNote}
                note={el}
                key={index}
                onChangeCurrNote={props.onChangeCurrNote}
                onChangeNote={props.onChangeNote}
              />
            );
        })}
        <NewNote
          type={ACTION_VALUES.ACTION}
          onChangeNote={props.onChangeNote}
        />
      </div>
    </section>
  );

  function onNotesListScroll(e:any): void {
    const storedNotes = localStorage.getItem("notes");
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    //Определеяем высоту блока списка заметок
    const noteListHeight = scrollTop + clientHeight;
    //Если скролл дошёл до самого низа - добавляем количество СNT_NOTES_TO_LOAD в список. Если возможно добавить СNT_NOTES_TO_LOAD - то добавляем это количество, если нет
    // то добавляем возможное оставшееся количество
    if (noteListHeight === scrollHeight) {
      props.onChangeNote((notes: INote[]) => {
        const notesStorage = storedNotes ? JSON.parse(storedNotes) : [];
        if (notes.length < notesStorage.length) {
          if (notesStorage.slice(notes.length).length > CNT_NOTES_TO_LOAD)
            return notes.concat(
              ...notesStorage.slice(notes.length, CNT_NOTES_TO_LOAD)
            );
          else return notes.concat(...notesStorage.slice(notes.length));
        }
        return notes;
      });
    }
  }
}
