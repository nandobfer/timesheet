let tempo = new Tempo()
class Registro {
    constructor(start, description) {
        this.description = description;
        this.start = start;
        this.date = tempo.getDate();

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

let minutes = 0;
let hour = 0;
let seconds;

let registros = [];
let start = 0;
let paused = 0;

const countTime = () => {
    intervalId = setInterval(() => {
        const miliseconds = Date.now() - start - paused;
        seconds = Math.floor(miliseconds / 1000);

        
        if (seconds == 60) {
            start = Date.now();
            minutes++;
        }
        
        if (minutes == 60) {
            minutes = 0;
            hour++;
        }

        seconds = seconds < 10 ? '0' + seconds : seconds
        minutes_text = minutes < 10 ? `0${minutes}` : minutes

        clock.text(`${hour}:${minutes_text}:${seconds}`)

    }, 100)
}

const pauseTimer = () => {
    paused = Date.now()
    clearInterval(intervalId);
    timer_button.text('Resume');
    timer_button.off('click', pauseTimer);
    timer_button.on('click', startTimer);

    let time = tempo.getTime();
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
        
        start = Date.now() - start;
        countTime()
        timer_button.text('Pause');
        timer_button.off('click', startTimer);
        timer_button.on('click', pauseTimer);
        input_field.addClass('off');
    
        let description = input_field.val();
        let time = tempo.getTime();
        let registro = new Registro(time, description)
        registros.push(registro)
    }
}

timer_button.on('click', startTimer);