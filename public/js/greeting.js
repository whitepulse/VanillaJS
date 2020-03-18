const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveStorage(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    // preventDefault 는 submit 을 금지시킴. hint 가 나오지 않음
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveStorage(currentValue);
}

function askForName() {
    // input form 을 보여준다
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}
    
function paintGreeting(text) {
    // input form 값을 숨긴다.
    form.classList.remove(SHOWING_CN);
    // 인사 문구를 보여준다.
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        // 존재하지 않음
        askForName();
    } else {
        // 존재함
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();