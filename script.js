let btn = document.querySelector('.button');
let bal = document.querySelector('.balance');
let perClick = document.querySelector('.perClick');
let perSec = document.querySelector('.perSec');
let sbtn = document.querySelector('.superButton');

let cookies = document.cookie
cookies = cookies.split('; ')
let click = 1;
let lSec = 0;
let sClick = 30;
let timer = 0

let intervalId;

function cookiesCheck(){
    for(let i = 0; i < cookies.length; i++){
        let cookie = cookies[i]
        let name_and_value = cookie.split('=')
        let name = name_and_value[0]
        let bal = document.querySelector('.balance');
        if (name == 'logiks' ){
            let logiks = name_and_value[1]
            bal.innerHTML = logiks;
            
        } else {
            let logiks = 0
            bal.innerHTML = logiks;

        }
        if (name == 'timer' ){
            let seconds = name_and_value[1]
            timer = seconds
            sbtn.innerHTML = timer
            
        } else {
            timer = 0
            sbtn.innerHTML = 'L'

        }

    }
}

function timeCheck(){
    if (timer == 0) {
       sbtn.style.pointerEvents = 'all'; // Дозволити клік на кнопку
       let amount = +document.querySelector('.balance').innerHTML;
       amount += sClick;
       document.querySelector('.balance').innerHTML = amount;
       document.cookie = `logiks=${amount}; max-age=99999999999999`;
       timer = 30;
       sbtn.innerHTML = timer;
       document.cookie = `timer=${timer}; max-age=9999999999999`
   }
   
   if (timer != 0 && !intervalId) {
       sbtn.style.pointerEvents = 'none'; // Заборонити клік на кнопку

       intervalId = setInterval(function() {
           timer--;
           document.cookie = `timer=${timer}; max-age=9999999999999`
           sbtn.innerHTML = timer;
           
           // Коли timer досягає 0, зупинити таймер, дозволити клік та змінити текст на кнопці
           if (timer == 0) {
               clearInterval(intervalId);
               intervalId = null; // Скидаємо ідентифікатор таймера
               sbtn.style.pointerEvents = 'all'; // Дозволяємо клікати на кнопку
               sbtn.innerHTML = 'L'; // Заміна тексту на кнопці на 'L'
           }
       }, 1000);
   }
}


cookiesCheck()
timeCheck()






let lastSuperButtonClick = 0; // Час останнього натискання superButton
let superButtonCooldown = 30000; // 30 секунд в мілісекундах


perClick.innerHTML = click;
perSec.innerHTML = lSec + ' L/c';

btn.addEventListener('click', () => {
    let amount = +document.querySelector('.balance').innerHTML;
    console.log(amount)
    amount += click;
    document.querySelector('.balance').innerHTML = +amount
    document.cookie = `logiks=${amount}; max-age=99999999999999`
    
});




sbtn.addEventListener('click', timeCheck);




