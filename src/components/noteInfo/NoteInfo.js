import React from "react";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";

export default class NoteInfo extends React.Component {
  render() {
    const { header } = this.props.note || {};
    return (
      <section className="noteInfo">
        {this.props.note ? (
          <React.Fragment>
            <NoteHeader header={header} />
            <NoteBody
              note={this.props.note}
              onChangeNote={this.props.onChangeNote}
            />
          </React.Fragment>
        ) : (
          <NoteHeader />
        )}
      </section>
    );
  }
}
