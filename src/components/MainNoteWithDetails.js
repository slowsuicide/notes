import React from "react";
import Note from "./Note";
import NewNote from "./NewNote";
import { ACTION_VALUES } from "./NoteParams";
export default class MainNoteWithDetails extends React.Component {
  render() {
    const el = this.props.note;
    return (
      <div className="notesInfo">
        <Note
          currNote={this.props.currNote}
          note={el}
          key={el.id}
          onChangeCurrNote={this.props.onChangeCurrNote}
          onChangeNote={this.props.onChangeNote}
        />
        <div className="noteDetails">
          {el.subnotes &&
            el.subnotes.map((subnote, index) => {
              return (
                <Note
                  currNote={this.props.currNote}
                  note={subnote}
                  key={index}
                  onChangeCurrNote={this.props.onChangeCurrNote}
                  onChangeNote={this.props.onChangeNote}
                />
              );
            })}
          <NewNote
            type={ACTION_VALUES.SUBACTION}
            onChangeNote={this.props.onChangeNote}
            parent={el}
          />
        </div>
      </div>
    );
  }
}
