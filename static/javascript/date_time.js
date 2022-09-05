const getDate = () => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    let date = `${day}/${month}/${year}`;

    return date;
}

const getTime = () => {
    const today = new Date();
    const hour = today.getHours();
    let minutes = today.getMinutes();

    minutes = minutes < 10 ? '0' + minutes : minutes;

    let time = `${hour}:${minutes}`;

    return time;
}