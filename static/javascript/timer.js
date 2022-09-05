class Registro {
    constructor(start, description) {
        this.description = description;
        this.start = start;
        this.date = getDate();

        let row = `<tr>\
                        <td>${this.date}</td>\
                        <td>-</td>\
                        <td>-</td>\
                        <td>-</td>\
                        <td>${this.description}</td>\
                        <td>${this.start}</td>\
                    </tr>`;
        $('.table-container tbody').append(row);
    }
}

let time = 1;
let time2 = 0;
let clock = $('#clock');
const timer_button = $('#timer-button');
const input_field = $('#input-field');
let intervalId;

let minutes;
let hour;
let seconds;

let registros = [];

const updateCount = () => {
    hour = Math.floor(time/3600);
    minutes = Math.floor(time2/60);
    seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    time2 = minutes == 60? 0 : time2;
   
    clock.text(`${hour}:${minutes}:${seconds}`);
    time++;
    time2++;
}

const pauseTimer = () => {
    clearInterval(intervalId);
    timer_button.text('Resume');
    timer_button.off('click', pauseTimer);
    timer_button.on('click', startTimer);

    let time = getTime();
    let registro = registros[registros.length - 1];
    registro.end = time;

    let end_time = `<td>${registro.end}</td>`
    $('.table-container tbody > tr:last-of-type').append(end_time)
    input_field.removeClass('off');
}

const startTimer = () => {
    if (!input_field.val()){
        return null;
    } else {
        
        intervalId = setInterval(updateCount, 1000);
        timer_button.text('Pause');
        timer_button.off('click', startTimer);
        timer_button.on('click', pauseTimer);
        input_field.addClass('off');
    
        let description = input_field.val();
        let time = getTime();
        let registro = new Registro(time, description)
        registros.push(registro)
    }
}

timer_button.on('click', startTimer);