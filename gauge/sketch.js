/* 
 * p5.js sketch based on foundation.
 * Generative gauges.
 *
 * Created by Edzard Höfig
 * Licensed under CC BY 4.0
 */

 /*
  * TODO
  * - Tick thinkness should scale
  * - Thickness of attachment point should scale
  * - slight offset problem with foreground svg
  * 
  */

const SKETCH_NAME = "gauge"
const SKETCH_VERSION = "0.11"

var radius

function preload() {
}

function calculateRadius() {
	let s = min(width, height)
	s -= s / 5
	s /= 2
	return s
}

// Angle: 0 is 12 o'clock
/*
function vecFromPolar(angle, length) {
	return createVector(
		length * sin(angle),
		length * -cos(angle)
	)
}
*/

function init() {
	radius = calculateRadius()
	console.group(`Gauge specific Information`)
	console.log(`radius is ${radius}`)
	console.groupEnd()
}

function resize() {
	radius = calculateRadius()
}

function drawArc(radius, from, to, colour, weight) {
	noFill()
	stroke(colour)
	strokeWeight(weight)
	strokeCap(SQUARE)
	push()
	rotate(-HALF_PI)
	arc(0, 0, 2 * radius, 2 * radius, from, to);
	pop()
}

function drawTicks(radius, count, length, offset, from, to, colour, weight) {

	noFill()
	stroke(colour)
	strokeWeight(weight)

	// Determine _d_elta as incremental angle for each tick
	let d = to - from
	if (d < 0) d += TWO_PI
	d /= count - 1

	push()
	//console.log(`${from} .. ${to}`)
	rotate(from)
	for (i = 0; i < count; ++i) {
		push()
		translate(0, -radius)
		line(0, offset, 0, offset + length)
		pop()
		rotate(d)
	}
	pop()
}

// Called once per frame
function paint() {
	
	push()
	translate(width / 2, height / 2)
	
	paintBackground()
	paintScale()
	paintLabels()
	paintPointer()
	paintForeground()	
	
	pop()	


}

function paintBackground() {
	background('#202050')
	
	stroke('#404040')
	strokeWeight(2)
	fill('black')
	circle(0, 0, 2 * calculateRadius())
}

function paintScale() {
	let radius = calculateRadius() * 0.8
	let from = 5 / 4 * PI
	let to = 3 / 4 * PI
	drawArc(radius, from, to, 'white', 2)
	drawArc(radius - (radius / 10), from, to, 'white', 1)
	drawTicks(radius, 46, radius / 10, 0, from, to, 'white', 1)
	drawTicks(radius, 10, radius / 5, 0, from, to, 'white', 6)
}

function paintLabels() {

}

function paintPointer() {
	
	push()
	rotate(5 / 4 * PI)

	// Attachment
	noStroke();
	fill('grey')
	circle(0, 0, 50);

	// Pointer
	stroke('red')
	strokeWeight(10)

	// Front end
	line(0, 0, 0, radius * -0.85)

	// Rear end
	line(0, 0, 0, radius * 0.2)

	pop()
}

function paintForeground() {
	let img = document.getElementById('foreground')
	let context = canvas.getContext('2d')
	context.drawImage(img, -radius, -radius, 2*radius, 2*radius)
}
