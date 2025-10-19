// Single-file resizable basketball court drawn using <canvas>
// Everything is drawn using proportions so it adapts to different canvas sizes.

const canvas = document.getElementById('court');
const ctx = canvas.getContext('2d');
const scaleInput = document.getElementById('scale');


// NBA court proportions: 94ft x 50ft -> ratio ~1.88 width / height
// We will use a flexible width and compute height from ratio.
const COURT_RATIO = 94 / 50; // width / height


function setCanvasSize(scale = 1) {
    // choose width depending on viewport but keep it reasonable
    const maxWidth = Math.min(window.innerWidth - 80, 1100);
    const baseWidth = Math.max(600, Math.min(900, maxWidth));
    const width = Math.round(baseWidth * scale);
    const height = Math.round(width / COURT_RATIO);


    // support high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // makes drawing coordinates logical pixels


    return { width, height };
}

function drawCourt() {
    const scale = parseFloat(scaleInput.value);
    const { width, height } = setCanvasSize(scale);


    // Clear
    ctx.clearRect(0,0,width,height);


    // Colors
    const wood = '#d8b58a';
    const darker = '#c79f73';
    const line = '#ffffff';
    const accent = '#c84b31';


    // Background wood
    ctx.fillStyle = wood;
    ctx.fillRect(0,0,width,height);


    // subtle darker center rectangle for visual interest
    ctx.fillStyle = darker;
    const inset = Math.min(width, height) * 0.03;
    ctx.fillRect(inset, inset, width - inset*2, height - inset*2);


    // Court boundary (sidelines)
    const margin = Math.min(width, height) * 0.02;
    ctx.lineWidth = Math.max(1, Math.round(Math.min(width,height) * 0.006));
    ctx.strokeStyle = line;
    roundRect(ctx, margin, margin, width - margin*2, height - margin*2, 6);
    ctx.stroke();


    // Center line and circle
    const centerX = width/2;
    const centerY = height/2;
    const centerRadius = height * 0.12;


    ctx.beginPath();
    ctx.moveTo(centerX, margin);
    ctx.lineTo(centerX, height - margin);
    ctx.stroke();

    ctx.beginPath();
    //3pt lines, corner
    ctx.moveTo(width*0.01, centerY*0.24);
    ctx.lineTo(width*0.075, centerY*0.24);
    ctx.stroke();

    ctx.beginPath();
    //3pt lines, corner
    ctx.moveTo(width*0.01, centerY*1.758);
    ctx.lineTo(width*0.075, centerY*1.758);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI*2);
    ctx.stroke();


    // Paint area (the key) on both ends
    const keyWidth = width * 0.16; // width of the key (measured across the court)
    const keyHeight = height * 0.19; // from baseline into court


    // left key (top of canvas)
    drawKey(ctx, margin, (height - keyHeight)/2 - keyHeight/2 + keyHeight*0.5, keyWidth, keyHeight, true);
    // right key (bottom of canvas)
    drawKey(ctx, width - margin - keyWidth, (height - keyHeight)/2 - keyHeight/2 + keyHeight*0.5, keyWidth, keyHeight, false);


    // Hoops
    const hoopOffset = margin + 5; // closer to baseline
    const hoopRadius = Math.max(4, Math.min(width,height) * 0.025);
    // left hoop center (near left baseline)
    ctx.strokeStyle = accent;
    ctx.lineWidth = Math.max(1, Math.round(Math.min(width,height) * 0.006));
    ctx.beginPath();
    ctx.arc(margin + hoopOffset, centerY, hoopRadius, 0, Math.PI*2);
    ctx.stroke();
    // right hoop
    ctx.beginPath();
    ctx.arc(width - margin - hoopOffset, centerY, hoopRadius, 0, Math.PI*2);
    ctx.stroke();


    // Three-point arcs
    drawThreePointArc(ctx, margin, centerY, width, height);


    // Optional: small labels
    ctx.fillStyle = '#f2f2f2';
    ctx.font = Math.max(12, Math.round(height * 0.03)) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Basketball Court — HTML Canvas', centerX, margin + 18);
}

function drawKey(ctx, x, y, w, h, left) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, (ctx.canvas.height / (window.devicePixelRatio||1) - h)/2, w, h);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(1, Math.round(Math.min(x+w,h) * 0.02));
    ctx.stroke();


    // Free-throw circle
    const circleX = left ? x + w - (w*0.01) : x + (w*0.01);
    const circleY = ctx.canvas.height / (window.devicePixelRatio||1) / 2;
    const r = h * 0.5;
    ctx.beginPath();
    ctx.arc(circleX, circleY, r, 0, Math.PI*2);
    ctx.stroke();
    ctx.restore();
}

function drawThreePointArc(ctx, margin, centerY, width, height) {
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = Math.max(1, Math.round(Math.min(width,height) * 0.006));


    // approximate three point radius as proportion of court height
    const radius = height * 0.4;
    // left arc center is near left baseline
    const marginThreePt = margin - margin*2.7
    const leftCenterX = marginThreePt + Math.min(width,height) * 0.04 + (Math.min(width,height) * 0.01);
    ctx.beginPath();
    ctx.arc(leftCenterX, centerY, radius, -Math.PI/2.5, Math.PI/2.5, false);
    ctx.stroke();


    // right arc
    const rightCenterX = width - leftCenterX;
    ctx.beginPath();
    ctx.arc(rightCenterX, centerY, radius, Math.PI - Math.PI/2, Math.PI + Math.PI/2, false);
    ctx.stroke();
    ctx.restore();
}

// small helper to draw rounded rect path
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}


// initial draw
drawCourt();


// redraw on resize or when slider changes
window.addEventListener('resize', debounce(drawCourt, 120));
scaleInput.addEventListener('input', drawCourt);


// tiny debounce
function debounce(fn, t) {
    let id = null; return (...args)=>{ if(id) clearTimeout(id); id = setTimeout(()=>fn(...args), t); };
}

