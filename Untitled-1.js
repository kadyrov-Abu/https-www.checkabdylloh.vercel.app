// App.jsx
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const defaultHtml = "<h1>Hello, Inky Clone!</h1>";
  const [html, setHtml] = useState(defaultHtml);
  const [templates, setTemplates] = useState([]);

  // Загрузка шаблонов из localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("templates") || "[]");
    setTemplates(saved);
  }, []);

  const saveTemplate = () => {
    const newTemplates = [...templates, html];
    setTemplates(newTemplates);
    localStorage.setItem("templates", JSON.stringify(newTemplates));
  };

  const loadTemplate = (index) => {
    setHtml(templates[index]);
  };

  const insertBlock = (block) => {
    let newBlock = "";
    switch (block) {
      case "heading":
        newBlock = "<h2>New Heading</h2>";
        break;
      case "button":
        newBlock = '<button style="padding:10px 20px;background:#007bff;color:white;border:none;border-radius:5px;">Click Me</button>';
        break;
      case "image":
        newBlock = '<img src="https://via.placeholder.com/150" alt="Image" />';
        break;
      default:
        return;
    }
    setHtml(html + "\n" + newBlock);
  };

  const exportHtml = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template.html";
    a.click();
  };

  const importHtml = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => setHtml(evt.target.result);
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <h1>Inky Clone</h1>
      <div className="toolbar">
        <button onClick={() => insertBlock("heading")}>Add Heading</button>
        <button onClick={() => insertBlock("button")}>Add Button</button>
        <button onClick={() => insertBlock("image")}>Add Image</button>
        <button onClick={saveTemplate}>Save Template</button>
        <button onClick={exportHtml}>Export HTML</button>
        <input type="file" accept=".html" onChange={importHtml} />
      </div>

      <div className="editor-container">
        <textarea
          className="editor"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
        <iframe
          className="preview"
          srcDoc={html}
          title="preview"
          sandbox="allow-same-origin"
        />
      </div>

      <h3>Saved Templates:</h3>
      <ul>
        {templates.map((t, i) => (
          <li key={i}>
            Template {i + 1}{" "}
            <button onClick={() => loadTemplate(i)}>Load</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
/* App.css */
.app {
  font-family: sans-serif;
  padding: 20px;
}
.toolbar {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.editor-container {
  display: flex;
  gap: 20px;
}
.editor {
  width: 50%;
  height: 400px;
  font-family: monospace;
  font-size: 14px;
  padding: 10px;
}
.preview {
  width: 50%;
  height: 400px;
  border: 1px solid #ccc;
}
ul {
  list-style: none;
  padding-left: 0;
}
button {
  cursor: pointer;
}
