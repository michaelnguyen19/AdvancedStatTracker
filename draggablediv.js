dragElement(document.getElementById("popUp"));

function dragElement(elmnt) {
    pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }
}

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); //preventDefault prevents the predicted action from happening
}