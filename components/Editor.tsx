import React from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

function Editor() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <div>
      <CodeEditor
        value={code}
        language="js"
        placeholder="Please enter JS code."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#000",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </div>
  );
}

export default Editor;
