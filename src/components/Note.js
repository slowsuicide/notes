import React from "react";
import NoteFunction from "./NoteFunction";
import { ACTION_VALUES } from "./NoteParams";
import editNoteImage from "../assets/img/editNote.png";
import saveNoteImage from "../assets/img/saveNote.png";
import deleteNoteImage from "../assets/img/deleteNote.png";
import showDetailsImage from "../assets/img/showDetails.png";
import hideDetailsImage from "../assets/img/hideDetails.png";

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.note = this.props.note || null;
    this.state = { edit: false };
    this.noteFuncType = this.note.hasOwnProperty("parentId")
      ? ACTION_VALUES.SUBACTION
      : ACTION_VALUES.ACTION;
    //noteFunctions - возможные функции взаимодействия с заметкой
    this.noteFunctions = [
      {
        name: this.noteFuncType,
        img: saveNoteImage,
        type: ACTION_VALUES.SAVE,
        func: () => this.onNoteFunctionClick(ACTION_VALUES.EDIT),
      },
      {
        name: this.noteFuncType,
        img: editNoteImage,
        type: ACTION_VALUES.EDIT,
        func: () => this.onNoteFunctionClick(ACTION_VALUES.EDIT),
      },
      {
        name: this.noteFuncType,
        img: deleteNoteImage,
        type: ACTION_VALUES.DELETE,
        func: () => this.onNoteFunctionClick(ACTION_VALUES.DELETE),
      },
    ];
  }
  render() {
    const note = (this.note = this.props.note || null);

    //headerStyles отображает, завершённая ли задача в заметке или нет. Присваивает соответствующий стиль
    const headerStyles = [
      this.props.currNote === this.props.note ? "current" : "",
      note.completed ? "completed" : "",
    ];
    return (
      <div className="note">
        {!note.hasOwnProperty("parentId") && (
          <div
            className={note.showDetails ? "hideDetails" : "showDetails"}
            onClick={() =>
              this.props.onChangeNote(this.onDetailBTNClick.bind(this))
            }
          >
            <img src={note.showDetails ? hideDetailsImage : showDetailsImage} />
          </div>
        )}
        {!this.state.edit && (
          <input
            type="checkbox"
            checked={note.completed}
            onChange={() =>
              this.props.onChangeNote(this.onChangeNoteState.bind(this))
            }
          />
        )}
        {!this.state.edit ? (
          <span
            className={headerStyles.join(" ")}
            onClick={() =>
              this.props.onChangeCurrNote(() => {
                return note;
              })
            }
          >
            {note.header}
          </span>
        ) : (
          <input
            type="text"
            value={note.header}
            onChange={(e) => this.onChangeHeader(e.target.value)}
          />
        )}

        <div className="noteActions">
          {this.noteFunctions.map((el, index) => {
            if (
              (this.state.edit && el.type === ACTION_VALUES.EDIT) ||
              (!this.state.edit && el.type === ACTION_VALUES.SAVE) ||
              (note.completed && el.type !== ACTION_VALUES.DELETE)
            )
              return;
            else return <NoteFunction key={index} info={el} />;
          })}
        </div>
      </div>
    );
  }

  onChangeNoteState(notes) {
    return notes.map((el) => {
      if (this.note.hasOwnProperty("parentId")) {
        el.subnotes.map((subnote) => {
          if (
            subnote.id === this.note.id && subnote.parentId===this.note.parentId
          )
            subnote.completed = !subnote.completed;
          return subnote;
        });
      } else if (el.id === this.note.id) el.completed = !el.completed;

      return el;
    });
  }

  onDetailBTNClick(notes) {
    return notes.map((el) => {
      if (el.id === this.note.id) {
        el.showDetails = !el.showDetails;
      }
      return el;
    });
  }

  onChangeHeader(newHeader) {
    this.props.onChangeNote((notes) => {
      return notes.map((el) => {
        if (
          this.note.hasOwnProperty("parentId") 
        ) {
          el.subnotes.map((subnote) => {
            if (subnote.id === this.note.id && subnote.parentId===this.note.parentId) subnote.header = newHeader;
            return subnote;
          });
        } else if (el.id === this.note.id) el.header = newHeader;

        return el;
      });
    });
  }

  onNoteFunctionClick(action) {
    if (action === ACTION_VALUES.EDIT) {
      this.editNote();
      return;
    }

    if (action === ACTION_VALUES.DELETE) {
      this.deleteNote();
      return;
    }
  }

  editNote() {
    this.setState({ edit: !this.state.edit });
  }

  deleteNote() {
    this.props.onChangeNote((notes) => {
      return notes
        .filter((el) => {
          if (
            this.note.hasOwnProperty("parentId") &&
            el.id === this.note.parentId
          ) {
            el.subnotes = el.subnotes.filter(
              (subnote) => subnote.id !== this.note.id
            );
          }
          return el.id !== this.note.id;
        })
        .map((el) => {
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
