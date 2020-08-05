/* 
 * p5.js sketch.
 * Boilerplate p5.js code
 *
 * Created by Edzard Höfig
 * Licensed under CC BY 4.0
 */

// One-time initialisation at program start
function setup() {
	createCanvas(windowWidth, windowHeight)
	print(`Canvas size is ${width}x${height}`)

	rectMode(CENTER)
	ellipseMode(CENTER)
}

var t = 0.0;

// Called once per frame
function draw() {

	t -= 0.01

	// Paint a black background (will completely erase the canvas)
	//background('black');
	clear()
	noFill()
	
	push()
		translate(width/2, height/2)
		rotate(t)
	
		stroke(0)
		strokeWeight(8)
		rect(0, 0, 500, 500)

		stroke(255, 153, 0)
		strokeWeight(5)
		rect(0, 0, 500, 500)
	pop()

	fill(0, 255, 0)
	strokeWeight(0)
	ellipse(mouseX, mouseY, 50, 50)
	noFill()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  print(`Canvas size is ${width}x${height}`);
}
