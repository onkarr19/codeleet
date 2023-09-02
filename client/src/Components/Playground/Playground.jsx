import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

import './Playground.css'

function App() {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState({
        javascript: '// JavaScript code here',
        python: '# Python code here',
        cpp: '// C++ code here',
    });

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const handleEditorChange = (newCode) => {
        setCode((prevCode) => ({
            ...prevCode,
            [language]: newCode,
        }));
    };

    const getCode = () => {
        console.log(code[language])
    }

    return (
        <div>
            <div>
                <select
                    id="languageDropdown"
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select><button onClick={() => getCode()}>Run</button>
            </div>
            <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
                <Editor
                    height="80vh"
                    width="100%"
                    language={language}
                    value={code[language]}
                    theme="vs-dark"
                    onChange={handleEditorChange}
                />
            </div>
        </div>
    );
}

export default App;
