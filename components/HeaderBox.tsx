import { Span } from "next/dist/trace";
import React from "react";

//params passed into this component, using type script the types are defined as an interface called HeaderBoxProps that was declared in the index.d.ts file
const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {/* if the type is greeting render a new span with the user passed in */}
        {type === "greeting" && (
          <span className="text-bankGradient">
            &nbsp;{user}
            </span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
