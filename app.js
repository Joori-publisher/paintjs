const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c",
    CANVAS_WIDTH = 700,
    CANVAS_HEIGHT = 500;

canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;

ctx.lineWidth=2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

// function onMouseDown(event){
//     painting = true;
// }
// function onMouseUp(event){
//     stopPainting();
// }
// function onMouseLeave(event){
//     stopPainting();
// }

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle=color;
    // console.log(event.target.style.backgroundColor)
}

function handleRangeChange(event){
    const width = event.target.value;
    ctx.lineWidth = width;
    //console.log(event.target.value)
}
function handleModeClick(event){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="Paint";
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
    
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href=image;
    link.download="PaintJS[🎨]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);

}
Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(save){
    save.addEventListener("click",handleSaveClick);
}