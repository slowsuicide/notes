import React from "react";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";
import { INoteProps } from "../../models";

export default function NoteInfo(props: INoteProps){

    const header:string = props.note ? props.note.header : '';
    return (
      <section className="noteInfo">
        {props.note ? (
          <React.Fragment>
            <NoteHeader header={header} />
            <NoteBody
              note={props.note}
              onChangeNote={props.onChangeNote}
            />
          </React.Fragment>
        ) : (
          <NoteHeader />
        )}
      </section>
    );
}
