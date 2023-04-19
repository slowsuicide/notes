import React from "react";
import Note from "./Note";
import NewNote from "./NewNote";
import { ACTION_VALUES, CNT_NOTES_TO_LOAD } from "./NoteParams";
import MainNoteWithDetails from "./MainNoteWithDetails";

export default class MainNotes extends React.Component {
  render() {
    //MainNotesWithDetails - отрисовывает главную заметку с имеющейся вложенностью
    //Notes - структура самой заметки
    const notes = this.props.notes;
    return (
      <section className="mainNotes">
        <div className="notesList" onScroll={(e) => this.onNotesListScroll(e)}>
          {notes.map((el, index) => {
            if (el.showDetails) {
              return (
                <MainNoteWithDetails
                  currNote={this.props.currNote}
                  note={el}
                  key={index}
                  onChangeCurrNote={this.props.onChangeCurrNote}
                  onChangeNote={this.props.onChangeNote}
                />
              );
            } else
              return (
                <Note
                  currNote={this.props.currNote}
                  note={el}
                  key={index}
                  onChangeCurrNote={this.props.onChangeCurrNote}
                  onChangeNote={this.props.onChangeNote}
                />
              );
          })}
          <NewNote
            type={ACTION_VALUES.ACTION}
            onChangeNote={this.props.onChangeNote}
          />
        </div>
      </section>
    );
  }
  onNotesListScroll(e) {
    const { scrollTop, scrollHeight, clientHeight} = e.target;
    //Определеяем высоту блока списка заметок
    const noteListHeight = scrollTop + clientHeight;
    //Если скролл дошёл до самого низа - добавляем количество СNT_NOTES_TO_LOAD в список. Если возможно добавить СNT_NOTES_TO_LOAD - то добавляем это количество, если нет
    // то добавляем возможное оставшееся количество
    if (noteListHeight === scrollHeight) {
      this.props.onChangeNote((notes) => {
        const notesStorage = JSON.parse(localStorage.getItem("notes"));
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
