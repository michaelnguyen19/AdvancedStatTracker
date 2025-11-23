
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, "Coordinate y:" + y);

    let d = getDistance(x, y);
    let dist_Left = d[0];
    let dist_Right = d[1];

    //console.log("Distance Right: " + dist_Right);
    //console.log("Distance Left: " + dist_Left)

    //________________________________Needed Variables________________________________

    const scaleInput = document.getElementById('scale');

    const COURT_RATIO = 94 / 50; // width / height

    const scale = parseFloat(scaleInput.value);

    const maxWidth = Math.min(window.innerWidth - 80, 1100);
    const baseWidth = Math.max(600, Math.min(900, maxWidth));
    const width = Math.round(baseWidth * scale);
    const height = Math.round(width / COURT_RATIO);

    const scaledX = x;
    const centerX = width/2;

    //________________________________________________________________

    //console.log(y/height)

    //Determine if shot is on right side or left
    if (scaledX < centerX) {
        //Determine if the shot location is 2pt or 3pt
        if ( (y / height) < 0.108) {
            console.log("Left Corner 3pt");
        }
        else if ( (y/height) > 0.89 ) {
            console.log("Right Corner 3pt");
        }
        else if (dist_Left < 0.233) {
            console.log("2 point shot");
        }
        else {
            console.log("3 point shot");
        }
    }
    else {
        if ( (y / height) < 0.104 || (y/height) > 0.89 ) {
            console.log("3 point shot");
        }
        else if (dist_Right < 0.21) {
            console.log("2 point shot");
        }
        else {
            console.log("3 point shot");
        }
    }

    //Specific Shot Locations for Left Side
    if (scaledX < centerX) {
        if ( (y / height) < 0.104) {
            console.log("Left Corner 3pt");
        }
        else if ( (y/height) > 0.89 ) {
            console.log("Right Corner 3pt");
        }
    }
        

    //console.log("Distance: " + d);
    console.log(y / height);
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

    const centerX = width/2;

    const scaledX = x;
    const scaledY = y;

    const x_Left = Math.pow(scaledX+20, 2);
    const y_Left = Math.pow(scaledY-height/2, 2);

    const dist_Left = Math.sqrt(x_Left + y_Left);

    const x_Right = Math.pow(scaledX-(width-20), 2);
    const y_Right = Math.pow(scaledY-height/2, 2);

    const dist_Right = Math.sqrt(x_Right + y_Right);

    return [
        dist_Left / scale / baseWidth,
        dist_Right / scale / baseWidth,
    ]
    
}




