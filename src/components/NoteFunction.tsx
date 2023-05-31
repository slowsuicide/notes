import React from "react";

export default function NoteFunction(props:any){

    const info= props.info;
    return (
       <button className={info.name} onClick={info.func}>
         <img src={info.img} />
       </button>
    )
}
