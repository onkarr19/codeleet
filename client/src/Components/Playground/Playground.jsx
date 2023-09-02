import React from 'react';

function App({ value, onChange }) {
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={onChange}
            // Add any other props or styles you need
            />
            <h2>tete</h2>
        </div>
    );
}

export default App;
