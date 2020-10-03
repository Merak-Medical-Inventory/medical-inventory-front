export const getDateString = (date: Date): string => {
    {
        const month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        return `${date.getFullYear()}-${month}-${day}`;
    }
};