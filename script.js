let btn = document.querySelector('.button');
let bal = document.querySelector('.balance');
let perClick = document.querySelector('.perClick');
let perSec = document.querySelector('.perSec');
let sbtn = document.querySelector('.superButton');

let cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    let [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
}, {});

let click = parseInt(cookies.click || 1); // Значення click (за замовчуванням 1)
let lSec = parseInt(cookies.lSec || 0); // Значення lSec (за замовчуванням 0)
let sClick = 30; // Супер кліки
let timer = parseInt(cookies.timer || 0); // Таймер (за замовчуванням 0)

let intervalId;

function saveToCookies(key, value) {
    document.cookie = `${key}=${value}; max-age=9999999999; path=/`;
}

function loadFromCookies() {
    bal.innerHTML = cookies.logiks || 0;
    timer = parseInt(cookies.timer || 0);
    sbtn.innerHTML = timer > 0 ? timer : 'L';
    perClick.innerHTML = click;
    perSec.innerHTML = `${lSec} L/c`;
}

function timeCheck() {
    if (timer == 0) {
        sbtn.style.pointerEvents = 'all'; // Дозволити клік на кнопку
        let amount = parseInt(bal.innerHTML);
        amount += sClick;
        bal.innerHTML = amount;
        saveToCookies('logiks', amount);
        timer = 30;
        sbtn.innerHTML = timer;
        saveToCookies('timer', timer);
    }

    if (timer != 0 && !intervalId) {
        sbtn.style.pointerEvents = 'none'; // Заборонити клік на кнопку

        intervalId = setInterval(() => {
            timer--;
            saveToCookies('timer', timer);
            sbtn.innerHTML = timer;

            if (timer == 0) {
                clearInterval(intervalId);
                intervalId = null; // Скидаємо ідентифікатор таймера
                sbtn.style.pointerEvents = 'all'; // Дозволяємо клікати на кнопку
                sbtn.innerHTML = 'L'; // Заміна тексту на кнопці на 'L'
            }
        }, 1000);
    }
}

// Виклик для ініціалізації значень
loadFromCookies();
timeCheck();

btn.addEventListener('click', () => {
    let amount = parseInt(bal.innerHTML);
    amount += click;
    bal.innerHTML = amount;
    saveToCookies('logiks', amount);
    saveToCookies('click', click); // Зберігати "за клік" у кукі
});

sbtn.addEventListener('click', timeCheck);

// Збереження click і lSec в кукі кожні 5 секунд
setInterval(() => {
    saveToCookies('click', click);
    saveToCookies('lSec', lSec);
}, 5000);

// Для збільшення заробітку за клік можна додати обробник, наприклад:
document.querySelector('.upgradeClick').addEventListener('click', () => {
    click += 1; // Збільшити кількість заробітку за клік
    perClick.innerHTML = click;
    saveToCookies('click', click);
});

// Для збільшення пасивного заробітку за секунду:
document.querySelector('.upgradeSec').addEventListener('click', () => {
    lSec += 1; // Збільшити пасивний заробіток
    perSec.innerHTML = `${lSec} L/c`;
    saveToCookies('lSec', lSec);
});
