import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

const EditorPage = () => {
  const location = useLocation();
  const initialText = location.state?.initialText || "";

  return (
    // Quill
    // websocket frontend-backend
    // invoice id
    // draft invoices  { id, text }

    <div className="quill-preview">
      <h2>Invoice 001</h2>
      <ReactQuill
        value={initialText}
        readOnly={false}
        theme={"snow"}
        modules={{ toolbar: false }}
      />
    </div>
  );
};

export default EditorPage;
