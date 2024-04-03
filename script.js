const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const penSize = document.querySelector('#pen-size')
const eraserSize = document.querySelector('#eraser-size')
const penColor = document.querySelector('#pen-color')
const resetBtn = document.querySelector('#reset-canvas')
const saveBtn = document.querySelector('#save-canvas')
const backgroundColors = document.querySelectorAll('.color-field')

const radioBtns = document.querySelectorAll('input[name="pen-type"]')


let lineWidth = 10
const pencilWidth = 5
let eraserWidth = 10
let lineColor = 'black'
let eraserColor = 'white'

penSize.value = lineWidth
eraserSize.value = lineWidth
penColor.value = 'black'

// canvas sizing
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// variables
let painting = false;

function startPosition() {
	painting = true
}

function finishedPosition() {
	painting = false
	ctx.beginPath();
}

function draw(e) {
	if (!painting) return;
	ctx.lineWidth = lineWidth;
	ctx.lineCap = "round";
	let canvasX = e.pageX - canvas.offsetLeft;
	let canvasY = e.pageY - canvas.offsetTop;

	ctx.strokeStyle = lineColor;
	ctx.lineTo(canvasX, canvasY);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(canvasX, canvasY);
}

const handleWidthChange = evt => {
	if (evt.target.id === 'eraser-size') {
		eraserWidth = parseInt(evt.target.value)
	} else if (evt.target.id === 'pen-size') {
		lineWidth = parseInt(evt.target.value)
	}
}

const handleColorChange = () => {
	lineColor = penColor.value
}

const handleEraserWidth = (evt) => {
	lineWidth = eraserSize.value
}

const changeTool = (btn) => {
	switch (btn.value) {
		case 'pen':
			lineWidth = penSize.value
			lineColor = penColor.value
			eraserWidth = eraserSize.value
			break
		case 'pencil':
			lineWidth = pencilWidth
			eraserWidth = eraserSize.value
			lineColor = penColor.value
			break
		case 'eraser':
			lineWidth = pencilWidth
			eraserWidth = eraserSize.value
			lineColor = eraserColor
			break
	}
}

const handleRadioInput = () => {
	for (const radioBtn of radioBtns) {
		if (radioBtn.checked) {
			changeTool(radioBtn)
		}
	}
}

const changeBackground = (evt) => {
	ctx.fillStyle = evt.target.style.backgroundColor
	ctx.fillRect(0,0, canvas.width, canvas.height)
	eraserColor = evt.target.style.backgroundColor
}

const clearScreen = () => {
	ctx.clearRect(0,0, canvas.width, canvas.height)
	eraserColor = 'white'
}

// EventListeners to draw a line
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

// background color

for (const backgroundColor of backgroundColors) {
	backgroundColor.addEventListener('click', changeBackground)
}

// radio btn
for (const btn of radioBtns) {
	btn.addEventListener('input', handleRadioInput)
}

// reset button
resetBtn.addEventListener('click', clearScreen)

// respond to user input
penSize.addEventListener('input', handleWidthChange)
eraserSize.addEventListener('input', handleWidthChange)
penColor.addEventListener("input", handleColorChange)
eraserSize.addEventListener('input', handleEraserWidth)

// Resizing when screen length changes

window.addEventListener('resize', () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
});

saveBtn.addEventListener("click", function(ev) {
	saveBtn.href = canvas.toDataURL();
	saveBtn.download = "mypainting.png";
}, false);
