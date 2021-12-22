export const getTime = (createdDate) => {
    const date = new Date(createdDate);
    const time = `${date.getUTCHours()}:${date.getMinutes()}`;
    return time;
}