const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.lineCap = "round";
ctx.lineJoin = "round";

let painting = false;
let filling = false; 

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        // 마우스 다운이 아니면, path 는 마우스를 따라다니는 형태
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // 마우스 다운이 일어난 이후는 path 에서 다음 이동되는 path 까지 path 라인을 생성하며 마우스를 따라다닌다는 뜻임.
        ctx.lineTo(x, y);
        // 실제로 잉크를 떨구는(획을 긋는) 역할.
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = (painting) ? false : true;

    // 마우스 다운 상태에서는 무조건 그리게 하고
    // 마우스 업 상태에서는 무조건 그리지 않게 한다.
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("moseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
 
colors.forEach(color => color.addEventListener("click", handleColorClick));

function handleRangeChange(event) {
    const rValue = event.target.value;
    ctx.lineWidth = rValue;
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
        mode.style.backgroundColor = "whitesmoke";
    } else {
        filling = true;
        mode.innerText = "Paint";
        mode.style.backgroundColor = "gray";
    }
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("/image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[Export]";
    link.click();
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}