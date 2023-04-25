import React from "react";

export default class NoteFunction extends React.Component {
  render() {
    const info= this.props.info;
    return (
       <button className={info.name} onClick={info.func}>
         <img src={info.img} />
       </button>
    )
  }
}
