import { useEffect, useState } from 'react';
import { marked } from 'marked';
import './App.css';

marked.setOptions({
  breaks: true,
});

function App() {
  
  const [editor, setEditor] = useState('')
  const [initial, setInitial] = useState(true)
  const readmePath = require("./initial.md");
  
  async function fetchText() {
    let response = await fetch(readmePath);

    if (response.status === 200) {
        let data = await response.text();
        setEditor(data);
    }
  }

  if (editor === '' && initial === true) {
    fetchText()
  }
  
  const handleChange = (event) => {
    setEditor(event.target.value);
    setInitial(false);
  }

  const markedFunc = function () {
    document.getElementById('preview').innerHTML =
      marked.parse(editor)
  }
  useEffect(() => {
    markedFunc();
  },[editor]);
  return (
    <div className="App">
        <div className="wrapper">
          <div className="left-side">
            <header className="header">Editor</header>
            <textarea name="editor" id="editor" value={editor} onChange={handleChange}></textarea>
          </div>
          <div className="right-side">
            <header className="header">Previewer</header>
            <div className="preview" id="preview"></div>
          </div>
        </div>
    </div>
  );
}

export default App;
