import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

import './Playground.css';

import config from '../../../config';
const backendURL = config.backendUrl;

function App() {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState({
        javascript: '// JavaScript code here',
        python: '# Python code here',
        cpp: '// C++ code here',
    });
    const [error, setError] = useState();
    const [output, setOutput] = useState();

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const handleEditorChange = (newCode) => {
        setCode((prevCode) => ({
            ...prevCode,
            [language]: newCode,
        }));
    };

    const handleRunCode = async (e) => {
        try {
            const response = await fetch(`${backendURL}/submission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                    // Add any other headers you might need, such as authentication tokens
                },
                body: JSON.stringify({
                    lang: language,
                    code: code[language],
                    problem_id: 2,
                    submit: false,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setOutput(data.message);
                setError();
            } else {
                // Handle the error response here
                setError('Failed to submit');
                setOutput();
                console.error('Failed to submit');
            }
        } catch (error) {
            // console.error('An error occurred:', error);
            setError('Failed to submit');
            setOutput();
        }
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
                </select><button onClick={() => handleRunCode()}>Run</button>
                
                <div>{error && <p>error: {error}</p>}</div>
                <div>{output && <p>output: {output}</p>}</div>
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
