
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, "Coordinate y:" + y);

    let d = getDistance(x, y);
    let dist_Left = d[0];
    let dist_Right = d[1];

    //Allows popup to access coordinates
    document.getElementById('X-coordinate').textContent = x;
    document.getElementById('Y-coordinate').textContent = y;

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
    var eventType = "2 pt";
    var location = "";


    //Determine if shot is on right side or left
    if (scaledX < centerX) { //Left Side
        //Determine if the shot location is 2pt or 3pt
        if ( (y / height) < 0.108 && (x/width) < 0.0747) {
            location = "Right Corner 3pt";
            eventType = "3 pt";
        }
        else if ( (y/height) > 0.89 && (x/width) < 0.0747) {
            location = "Left Corner 3pt";
            eventType = "3 pt";
        }
        else if (dist_Left > 0.233 && (x / width) < 0.345 && (x / width) > 0.0748 && (y / height) < 0.376) {
            location = "Right Wing 3pt";
            eventType = "3 pt";
        }
        else if (dist_Left > 0.233 && (x / width) < 0.345 && (x / width) > 0.0748 && (y / height) > 0.376 && (y / height) < 0.624) {
            location = "Center 3pt";
            eventType = "3 pt";
        }
        else if (dist_Left > 0.233 && (x / width) < 0.345 && (x / width) > 0.0748 && (y / height) > 0.624) {
            location = "Left Wing 3pt";
            eventType = "3 pt";
        }
        else if (dist_Left < 0.233 && (x/width) < 0.06 && (y/height) > 0.108 && (y/height) < 0.4) {
            location = "Right Baseline 2pt";
            console.log("Right Baseline 2 pt")
        }
        else if (dist_Left < 0.233 && (x/width) < 0.06 && (y/height) < 0.89 && (y/height) > 0.6) {
            location = "Left Baseline 2pt";
            console.log("Left Baseline 2 pt")
        }
        else if (dist_Left < 0.233 && (x/width) > 0.06 && (x/width) < 0.211 && (y/height) > 0.108 && (y/height) < 0.4) {
            location = "Right Wing 2pt";
            console.log("Right Wing Midrange 2pt")
        }
        else if (dist_Left < 0.233 && (x/width) > 0.1706 && (x/width) < 0.2216 && (x/width) > 0.171 && (y/height) > 0.4 && (y/height) < 0.6) {
            location = "Center Midrange 2pt";
            console.log("Center Midrange 2pt");
        }
        else if (dist_Left < 0.233 && (x/width) > 0.06 && (x/width) < 0.211 && (y/height) > 0.6 && (y/height) < 0.89) {
            location = "Left Wing 2pt";
        }
        else if (dist_Left < 0.233 && (x/width) > 0.01 && (x/width) < 0.1706 && (y/height) > 0.4 && (y/height) < 0.6) {
            location = "Paint";
        }
        else {
            console.log("3 point shot");
            eventType = "3 pt";
        }
    }
    else {
        if ( dist_Right > 0.21 && (y / height) < 0.108 && (x/width) > 0.9228) {
            console.log("Left Corner 3pt");
            eventType = "3 pt";
        }
        else if ( dist_Right > 0.21 && (y/height) > 0.89 && (x/width) > 0.9228) {
            console.log("Right Corner 3pt");
            eventType = "3pt"
        }
        //else if ( (dist_Right > 0.21 && ))
        // else if() {

        // }
        else if (dist_Right < 0.21) {
            console.log("2 point shot");
        }
        else {
            console.log("3 point shot");
            eventType = "3 pt";
        }
    }

    var select = document.getElementById("shotPoints");
    select.value = eventType;

    var select2 = document.getElementById("shotLocation");
    select2.value = location;

    //Specific Shot Locations for Left Side
    // if (scaledX < centerX) {
    //     if ( (y / height) < 0.104) {
    //         console.log("Left Corner 3pt");
    //     }
    //     else if ( (y/height) > 0.89 ) {
    //         console.log("Right Corner 3pt");
    //     }
    // }
        

    //console.log("Distance: " + d);
    console.log("y/height: " + y / height);
    console.log("x / width: " + x / width);
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

document.getElementById("shotEvent").addEventListener("submit", saveData);

function saveData(event) {
    //console.log(event);
    event.preventDefault();
    alert("The form was submitted")

    const madeMiss = document.querySelector('input[name="made/miss"]:checked');
    const madeMissValue = madeMiss.value

    const player = document.getElementById("player").value;

    const defender = document.getElementById("defender").value;

    const shotPoints = document.getElementById("shotPoints").value;

    var newRow = "<tr><td>" + player + "</td><td>" + shotPoints; //add x & y-coord and add more table elements

}




