export const getDate = () => {
    const fMonth = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    const Data = new Date();
    const year = Data.getFullYear();
    const month = Data.getMonth();
    const day = Data.getDate();
    const hour = Data.getHours();
    const minute = Data.getMinutes();
    return `${day} ${fMonth[month]} ${year}, ${hour < 10 ? hour + '0' : hour}:${
        minute < 10 ? minute + '0' : minute
    }`;
};
