// Function to format a date object into a human-readable string
export function formatDate(date) {
    const options = { 
        year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', 
        minute: 'numeric', second: 'numeric', timeZoneName: 'short' 
    };
    return date.toLocaleString('en-US', options);
}
