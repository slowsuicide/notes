import React from "react";
import goBack from "../../assets/img/goback.png";
import { usePageVersionContext } from "../context/VersionProvider";

type INoteHeader = {
  header?: string;
};

export default function NoteHeader(props: INoteHeader) {
  const versionInfo = usePageVersionContext();

  return (
    <div className="noteHeader">
      <div
        className="return-to-main"
        onClick={() => {
          if (versionInfo.toggle) versionInfo.toggle("main");
        }}
      >
        <img src={goBack}></img>
      </div>
      <div>
        <span>{props.header}</span>
      </div>
    </div>
  );
}
