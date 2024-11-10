let btn = document.querySelector('.button');
let bal = document.querySelector('.balance');
let perClick = document.querySelector('.perClick');
let perSec = document.querySelector('.perSec');
let sbtn = document.querySelector('.superButton');

let logiks = 0;
let click = 1;
let lSec = 0;
let sClick = 30;

let lastSuperButtonClick = 0; // Час останнього натискання superButton
let superButtonCooldown = 30000; // 30 секунд в мілісекундах

bal.innerHTML = logiks;
perClick.innerHTML = click;
perSec.innerHTML = lSec + ' L/c';

btn.addEventListener('click', () => {
    logiks += click;
    bal.innerHTML = logiks;
});

sbtn.addEventListener('click', () => {
    let currentTime = Date.now();
    
    // Якщо з часу останнього натискання пройшло більше 30 секунд
    if (currentTime - lastSuperButtonClick >= superButtonCooldown) {
        logiks += sClick;
        bal.innerHTML = logiks;
        
        lastSuperButtonClick = currentTime; // Оновлюємо час останнього натискання
        sbtn.innerHTML = '30' // Повертаємо текст кнопки до звичайного
    } else {
        let remainingTime = Math.ceil((superButtonCooldown - (currentTime - lastSuperButtonClick)) / 1000);
        sbtn.innerHTML = remainingTime // Оновлюємо текст кнопки
    }
});

setInterval(() => {
    logiks += lSec;
    bal.innerHTML = logiks;

    let currentTime = Date.now();
    
    // Оновлюємо текст кнопки кожну секунду, щоб відображати актуальний час залишку
    if (currentTime - lastSuperButtonClick < superButtonCooldown) {
        let remainingTime = Math.ceil((superButtonCooldown - (currentTime - lastSuperButtonClick)) / 1000);
        sbtn.innerHTML = remainingTime
    } else {
        sbtn.innerHTML = 'L' // Після закінчення часу, оновлюємо текст
    }
}, 1000);