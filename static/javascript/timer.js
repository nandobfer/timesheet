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

class Timer {
    constructor () {
      this.isRunning = false;
      this.startTime = 0;
      this.overallTime = 0;
    }
  
    _getTimeElapsedSinceLastStart () {
      if (!this.startTime) {
        return 0;
      }
    
      return Date.now() - this.startTime;
    }
  
    start () {
      if (this.isRunning) {
        return console.error('Timer is already running');
      }
  
      this.isRunning = true;
  
      this.startTime = Date.now();
    }
  
    stop () {
      if (!this.isRunning) {
        return console.error('Timer is already stopped');
      }
  
      this.isRunning = false;
  
      this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }
  
    reset () {
      this.overallTime = 0;
  
      if (this.isRunning) {
        this.startTime = Date.now();
        return;
      }
  
      this.startTime = 0;
    }
  
    getTime () {
      if (!this.startTime) {
        return 0;
      }
  
      if (this.isRunning) {
        return this.overallTime + this._getTimeElapsedSinceLastStart();
      }
  
      return this.overallTime;
    }
  }
  
const timer = new Timer();
  

let clock = $('#clock');
const timer_button = $('#timer-button');
const input_field = $('#input-field');

let minutes = 0;
let hour = 0;
let seconds;
let flag_seconds = false;
let flag_minutes = false;

let registros = [];

const updateCount = () => {
    seconds = Math.round(timer.getTime() / 1000)
    seconds = seconds % 60;
    if (seconds == 1) {
        flag_seconds = true;
    }
    
    if (flag_seconds) {
        if (seconds == 0) {
            minutes++;
            flag_seconds = false;
        }
    }

    minutes = minutes % 60;
    if (minutes == 1) {
        flag_minutes = true;
    }

    if (flag_minutes) {
        if (minutes == 0) {
            hour++;
            flag_minutes = false;
        }
    }
    
    clock.text(`${hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
}

const pauseTimer = () => {
    timer.stop();

    timer_button.text('Resume');
    timer_button.off('click', pauseTimer);
    timer_button.on('click', startTimer);

    let end_time = getTime();
    let registro = registros[registros.length - 1];
    registro.end = end_time;

    let end_time_element = `<td>${registro.end}</td>`
    $('.table-container tbody > tr:last-of-type').append(end_time_element)
    input_field.removeClass('off');
}

const startTimer = () => {
    if (!input_field.val()){
        return null;
    } else {
        
        timer.start();

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
setInterval(updateCount, 100)