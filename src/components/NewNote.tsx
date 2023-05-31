import React, { useState }  from "react";
import NoteFunction from "./NoteFunction";
import {
  ACTION_VALUES,
  NOTE_MAIN_TEMPLATE,
  NOTE_DETAIL_TEMPLATE,
} from "./NoteParams";
import addNoteImage from "../assets/img/addNote.png";
import saveNoteImage from "../assets/img/saveNote.png";
import deleteNoteImage from "../assets/img/deleteNote.png";
import {INote,ISubNote,INoteProps,INoteFunctions} from '../models'


export default function NewNote(props:INoteProps) {
  let actualHeader: string;

  const [noteOnEdit, setNoteOnEdit] = useState<boolean>(false);
    const noteFuncType: string = props.type || '';
    const noteFunctions: INoteFunctions[] = [
      {
        name: noteFuncType,
        img: addNoteImage,
        type: ACTION_VALUES.ADD,
        func: () => onNoteFunctionClick(ACTION_VALUES.ADD),
      },
      {
        name: noteFuncType,
        img: saveNoteImage,
        type: ACTION_VALUES.SAVE,
        func: () => onNoteFunctionClick(ACTION_VALUES.SAVE),
      },
      {
        name: noteFuncType,
        img: deleteNoteImage,
        type: ACTION_VALUES.DELETE,
        func: () => onNoteFunctionClick(ACTION_VALUES.DELETE),
      },
    ];


    return (
      <div className="newNote">
        {noteOnEdit && (
          <input
            type="text"
            placeholder="header name..."
            onChange={(e) => onChangeHeader(e.target.value)}
          />
        )}
        <div className="noteActions">
          {noteFunctions.map((el, index) => {
            if (!noteOnEdit && el.type === ACTION_VALUES.ADD)
              return <NoteFunction key={index} info={el} />;
            else if (noteOnEdit && el.type !== ACTION_VALUES.ADD)
              return <NoteFunction key={index} info={el} />;
            else return;
          })}
        </div>
      </div>
    );
  

 function onChangeHeader(newHeader:string):void {
    actualHeader = newHeader;
  }

  function onNoteFunctionClick(action:string):void {
    if (action === ACTION_VALUES.ADD) {
      editNote();
      return;
    }

    if (action === ACTION_VALUES.SAVE) {
      saveNote();
      return;
    }

    if (action === ACTION_VALUES.DELETE) {
      editNote();
      return;
    }
  }

  function editNote():void {
    setNoteOnEdit(!noteOnEdit);
  }

  function saveNote():void {
    editNote();

    if (noteFuncType === ACTION_VALUES.ACTION) {
      props.onChangeNote((notes:any) => {
        return (notes.concat({ ...JSON.parse(JSON.stringify(NOTE_MAIN_TEMPLATE)), id: notes.length + 1,header:actualHeader }));
      });
    }
    if (noteFuncType === ACTION_VALUES.SUBACTION) {
        props.onChangeNote((notes:INote[]) => {
            return notes.map((el:INote | ISubNote)=>{
            if( props.parent && el.id===props.parent.id )  {
              if (!el.subnotes) {
                el.subnotes = []; 
              }
                el.subnotes.push({ ...JSON.parse(JSON.stringify(NOTE_DETAIL_TEMPLATE)),parentId:el.id, id: el.subnotes.length + 1,header:actualHeader })
            }
            return el
            })
          });
    }
  }
}
