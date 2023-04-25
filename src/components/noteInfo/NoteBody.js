import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default class NoteBody extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(html) {
    this.props.onChangeNote((notes) => {
      return notes.map((el) => {
        if (
          this.props.note.hasOwnProperty("parentId") &&
          el.id === this.props.note.parentId
        ) {
          el.subnotes.map((subnote) => {
            if (subnote.id === this.props.note.id) subnote.description = html;
            return subnote;
          });
        } else if (el.id === this.props.note.id) el.description = html;

        return el;
      });
    });
  }

  render() {
    return (
      <div className="noteBody">
        <ReactQuill
          theme="snow"
          className="noteBody-editor"
          value={this.props.note.description}
          onChange={this.handleChange}
          readOnly = {this.props.note.completed}
        />
      </div>
    );
  }
}
