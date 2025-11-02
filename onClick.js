function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, "Coordinate y:" + y);

    let d = getDistance(x, y);
    console.log("Distance: " + d);
}

let canvasElem = document.querySelector("canvas");

canvasElem.addEventListener("mousedown", function (e) {
    getMousePosition(canvasElem, e);
})

function getDistance(x, y) {
    const scaleInput = document.getElementById('scale');

    const COURT_RATIO = 94 / 50; // width / height

    const scale = parseFloat(scaleInput.value);

    // choose width depending on viewport but keep it reasonable
    const maxWidth = Math.min(window.innerWidth - 80, 1100);
    const baseWidth = Math.max(600, Math.min(900, maxWidth));
    const width = Math.round(baseWidth * scale);
    const height = Math.round(width / COURT_RATIO);

    const x1 = Math.pow(x+20, 2);
    const y1 = Math.pow(y-height/2, 2);

    const dist = Math.sqrt(x1 + y1);

    return dist;
}




