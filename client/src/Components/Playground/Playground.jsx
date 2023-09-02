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
        </div>
    );
}

export default App;
