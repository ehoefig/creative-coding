/* 
 * p5.js sketch based on foundation.
 * Generative gauges.
 *
 * Created by Edzard Höfig
 * Licensed under CC BY 4.0
 */

const SKETCH_NAME = "gauge"
const SKETCH_VERSION = "0.1"

function calculateRadius() {
	let s = min(width, height)
	s -= s / 5
	s /= 2
	return s
}

function init() {
	console.group(`Gauge specific Information`)
	console.log(`radius is ${calculateRadius()}x`)
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
	background('black')
		
	push()
	translate(width/2, height/2)

	// Mark center
	stroke('grey')
	strokeWeight(5)
	point(0, 0)

	// Draw scale
	let radius = calculateRadius()
	let from = 5/4 * PI
	let to = 3/4 * PI
	drawArc(radius, from, to, 'white', 2)
	drawArc(radius - (radius / 10), from, to, 'white', 1)
	drawTicks(radius, 46, radius / 10, 0, from, to, 'white', 1)
	drawTicks(radius, 10, radius / 5, 0, from, to, 'white', 6)
	pop()
}
