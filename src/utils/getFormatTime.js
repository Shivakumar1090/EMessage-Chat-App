 
export const formatTimestampToTime = (timestamp) => {
    if(timestamp === undefined)return null;
    const date = timestamp?.toDate();
    const hours = date?.getHours().toString().padStart(2, '0');
    const minutes = date?.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
