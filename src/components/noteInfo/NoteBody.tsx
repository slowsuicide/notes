import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { INote, ISubNote } from "../../models";
export default function NoteBody(props: any) {
  function handleChange(html: string) {
    props.onChangeNote((notes: INote[] | ISubNote[]) => {
      if (notes)
        return notes.map((el: INote | ISubNote) => {
          if (
            props.note.hasOwnProperty("parentId") &&
            el.id &&
            el.id === props.note.parentId
          ) {
            if (el.subnotes)
              el.subnotes.map((subnote: ISubNote) => {
                if (subnote.id === props.note.id) subnote.description = html;
                return subnote;
              });
          } else if (el.id === props.note.id) el.description = html;

          return el;
        });
    });
  }

  return (
    <div className="noteBody">
      <ReactQuill
        theme="snow"
        className="noteBody-editor"
        value={props.note.description}
        onChange={handleChange}
        readOnly={props.note.completed}
      />
    </div>
  );
}
