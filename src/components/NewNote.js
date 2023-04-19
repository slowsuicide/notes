import React from "react";
import NoteFunction from "./NoteFunction";
import {
  ACTION_VALUES,
  NOTE_MAIN_TEMPLATE,
  NOTE_DETAIL_TEMPLATE,
} from "./NoteParams";
import addNoteImage from "../assets/img/addNote.png";
import saveNoteImage from "../assets/img/saveNote.png";
import deleteNoteImage from "../assets/img/deleteNote.png";

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
    this.noteFuncType = this.props.type;
    this.noteFunctions = [
      {
        name: this.noteFuncType,
        img: addNoteImage,
        type: ACTION_VALUES.ADD,
        func: () => this.onNoteFunctionClick(ACTION_VALUES.ADD),
      },
      {
        name: this.noteFuncType,
        img: saveNoteImage,
        type: ACTION_VALUES.SAVE,
        func: () => this.onNoteFunctionClick(ACTION_VALUES.SAVE),
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
    return (
      <div className="newNote">
        {this.state.edit && (
          <input
            type="text"
            placeholder="header name..."
            onChange={(e) => this.onChangeHeader(e.target.value)}
          />
        )}
        <div className="noteActions">
          {this.noteFunctions.map((el, index) => {
            if (!this.state.edit && el.type === ACTION_VALUES.ADD)
              return <NoteFunction key={index} info={el} />;
            else if (this.state.edit && el.type !== ACTION_VALUES.ADD)
              return <NoteFunction key={index} info={el} />;
            else return;
          })}
        </div>
      </div>
    );
  }

  onChangeHeader(newHeader) {
    this.header = newHeader;
  }

  onNoteFunctionClick(action) {
    if (action === ACTION_VALUES.ADD) {
      this.editNote();
      return;
    }

    if (action === ACTION_VALUES.SAVE) {
      this.saveNote();
      return;
    }

    if (action === ACTION_VALUES.DELETE) {
      this.editNote();
      return;
    }
  }

  editNote() {
    this.setState({ edit: !this.state.edit });
  }

  saveNote() {
    this.editNote();

    if (this.noteFuncType === ACTION_VALUES.ACTION) {
      this.props.onChangeNote((notes) => {
        return  notes.concat({ ...NOTE_MAIN_TEMPLATE, id: notes.length + 1,header:this.header });
      });
    }
    if (this.noteFuncType === ACTION_VALUES.SUBACTION) {
        this.props.onChangeNote((notes) => {
            return notes.map(el=>{
            if(el.id===this.props.parent.id)  {
                el.subnotes.push({ ...NOTE_DETAIL_TEMPLATE,parentId:el.id, id: el.subnotes.length + 1,header:this.header })
            return el}
                else return el
            })
          });
    }
  }
}
