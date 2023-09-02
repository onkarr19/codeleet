import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import config from '../../../config';
const backendURL = config.backendUrl;

import Playground from '../Playground/Playground';
import './Problem.css'

function App() {
    const params = useParams();
    const problem_id = params.pid;
    const [problemData, setProblemData] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch(`${backendURL}/problem/${problem_id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProblemData(data.problem);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProblem();
    }, []);

    return (
        <div className="container">
            <div className="left">
                {problemData ? (
                    <div>
                        <h2>Problem Title: {problemData.title}</h2>
                        <p>Problem Description: {problemData.description}</p>
                        {/* Add more rendering for other problem data */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <div className="right">
                {/* Your other content */}
                <Playground
                    value={inputValue}
                    onChange={handleInputChange}
                />
                {/* Your other content */}
            </div>
        </div>
    );
};

export default App;