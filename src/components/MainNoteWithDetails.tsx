import React from "react";
import Note from "./Note";
import NewNote from "./NewNote";
import { ACTION_VALUES } from "./NoteParams";
import {INote,ISubNote,INoteProps} from '../models'



export default function MainNoteWithDetails(props: INoteProps){
    const el = props.note  ;
    if (!el) {
      return null; 
    }
    return (
      <div className="notesInfo">
        <Note
          currNote={props.currNote}
          note={el}
          key={el.id}
          onChangeCurrNote={props.onChangeCurrNote}
          onChangeNote={props.onChangeNote}
        />
        <div className="noteDetails">
          {el.subnotes &&
            el.subnotes.map((subnote:ISubNote, index:number) => {
              return (
                <Note
                  currNote={props.currNote}
                  note={subnote}
                  key={index}
                  onChangeCurrNote={props.onChangeCurrNote}
                  onChangeNote={props.onChangeNote}
                />
              );
            })}
          <NewNote
            type={ACTION_VALUES.SUBACTION}
            onChangeNote={props.onChangeNote}
            parent={el}
          />
        </div>
      </div>
    );
}
