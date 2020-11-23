export default function refinar(canvasAdjust, fg, colorMarker){
    var ctx = canvasAdjust.getContext("2d");
    var isDrawing;
    canvasAdjust.onmousedown = function (e) {
        if (fg.disabled === false) {
            let mousePos = getMousePosition(e);
            isDrawing = true;
            ctx.beginPath();
            ctx.lineWidth = 20;
            ctx.lineJoin = ctx.lineCap = "round";
            ctx.strokeStyle = colorMarker;
            ctx.moveTo(mousePos.x, mousePos.y);
        }

    };
    canvasAdjust.onmousemove = function (e) {
        if (isDrawing) {
            let mousePos = getMousePosition(e);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
        }
    };
    canvasAdjust.onmouseup = function () {
        isDrawing = false;
    };

}

function getMousePosition(e) {
    let box = canvasAdjust.getBoundingClientRect();
    return {
        x: e.clientX - box.left,
        y: e.clientY - box.top,
    };
}

let colorMarker = "green"
bg.onclick=()=>{
    assignMarker('Background')
  }
  fg.onclick=()=>{
    assignMarker('Foreground')
  }
  
  canvasAdjust.onmouseover = () => {
    refinar(canvasAdjust, fg, colorMarker)
  }
  
  function assignMarker(text) {
    switch (text) {
        case "Foreground":
            colorMarker = "green";
            break;
  
        case "Background":
            colorMarker = "red";
            break;
    }
  }