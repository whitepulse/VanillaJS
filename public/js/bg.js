const body = document.querySelector("body");

const IMG_NUMBER = 7;

function colorThief(image) {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(image);
    return (color);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function invert(rgb) {
    rgb = [].slice.call(arguments).join(",").replace(/rgb\(|\)|rgba\(|\)|\s/gi, '').split(',');
    for (var i = 0; i < rgb.length; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `/public/images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");

    if (image.complete) {
        colorThief(image);
    } else {
        image.addEventListener("load", function () {
            const RGB = colorThief(image);
            document.querySelector(".js-title").style.color = invert(RGB);
            document.querySelector(".js-name").style.color = invert(RGB);
        });
    }

    body.appendChild(image);
}

function genRandom() {
    // 반올림 반내림
    //const number = Math.ceil(Math.random() * IMG_NUMBER);
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();