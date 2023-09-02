import React, { useState, useEffect } from "react";

import config from '../../../config';
import { Link } from "react-router-dom";
const backendURL = config.backendUrl;

function App() {

    const [problems, setProblems] = useState(null);
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch(`${backendURL}/problem`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProblems(data.problems);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProblems();
    }, []);
    return <>
        <h2>Problems Page</h2>
        { problems ? (
                <ul>
                    {problems.map((problem) => (
                        <li key={problem.problemId}>
                            <strong>Title:</strong> <Link to= {`/problem/${problem.problemId}`} > {problem.title} </Link> <br />
                            <strong>Difficulty:</strong> {problem.difficulty}<br />
                            <strong>Acceptance:</strong> {problem.acceptance}<br />
                            <br></br>
                            </li>
                    ))}
                </ul>
            ) : (
                <p>Loading problems...</p>
            )}
        
    </>
}

export default App;