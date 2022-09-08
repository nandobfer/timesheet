class Tempo {
    constructor() {
        
    }

    getDate = () => {
        const today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        
        this.date = `${day}/${month}/${year}`;
        
        return this.date;
    }

    getTime = () => {
        const today = new Date();
        const hour = today.getHours();
        let minutes = today.getMinutes();
    
        minutes = minutes < 10 ? '0' + minutes : minutes;
    
        this.time = `${hour}:${minutes}`;
    
        return this.time;
    }

}
