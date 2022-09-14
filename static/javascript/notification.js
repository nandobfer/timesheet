let almost_done = true;
let done = true;

const alertEndOfTime = () => {
    if (hour == 8) {
        if (done) {
            const title = 'ACABOU'
            const body = 'Completou as 8 horas de trabalho'
            const click_text = 'clicado'
            
            new Notification(title, {body: body})
            done = false;
        }
    }
    
    if (hour == 7 && minutes == 55) {
        if (almost_done) {
            const title = 'Acabando'
            const body = 'Faltam 5 minutos!'
            const click_text = 'clicado'
            
            new Notification(title, {body: body})
            almost_done = false;
        }
    }
}

setInterval(alertEndOfTime, 1000);