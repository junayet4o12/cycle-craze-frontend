
export const dateToStringDate = (date: Date | string) => {
    return new Date(date).toLocaleString('en-US', {
        weekday: 'short',     // e.g., "Monday"
        year: '2-digit',     // e.g., "2025"
        month: 'long',       // e.g., "April"
        day: 'numeric',      // e.g., "22"
        hour: '2-digit',
        minute: '2-digit',
        hour12: true         // Set to false for 24-hour format
    })
};