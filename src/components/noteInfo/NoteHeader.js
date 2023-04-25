import React from "react";

export default class NoteHeader extends React.Component {

  render() {
    return (
      <div className="noteHeader">
        <span>{this.props.header}</span>
      </div>
    );
  }
}
