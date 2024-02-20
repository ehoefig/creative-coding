/* 
 * p5.js sketch based on foundation.
 * A rotating yin and ynag with bouncing balls.
 * An exercise in implementing collision detection and response for circular objects.
 *
 * Created by Edzard Höfig
 * Licensed under CC BY 4.0
 */


const SKETCH_NAME = "yinyang - two balls bouncing"
const SKETCH_VERSION = "0.1"

const line_thickness = 2

var sign, white_dot, black_dot

var sN

class Ball {

	constructor(x, y, radius, color) {
		this.position = createVector(x, y)
		this.velocity = createVector(0, 0)
		this.acceleration = createVector(0, 0)
		this.radius = radius
		this.color = color
		this.in_edge_collision = false
		this.in_white_collision = false
		this.in_black_collision = false
	}

	update() {
		this.velocity.add(this.acceleration)
		this.position.add(this.velocity)
		this.acceleration.mult(0)
	}

	show() {
		// if (this.in_edge_collision) fill('green')
		// else if (this.in_white_collision) fill('white')
		// else if (this.in_black_collision) fill('black')
		// else noFill()

		noStroke()
		fill(this.color)

		ellipse(this.position.x, this.position.y, this.radius * 2);
		// Show velocity as line from ball origin
		//drawArrow(this.position, p5.Vector.mult(this.velocity, 10), 'red')
	}

	exert_force(force) {
		this.acceleration.add(force)
	}

	check_collision(sign) {

		// Does currently collide with outside?
		let edge_distance = (sign.radius - this.radius) - p5.Vector.dist(this.position, sign.origin)

		// Does currently collide with white half?
		let white_half_origin = createVector(0, -sign.radius / 2)
		white_half_origin.rotate(sign.angle)
		white_half_origin.add(sign.origin)
		let white_distance = Number.MAX_VALUE
		if (this.color == 'white') {
			white_distance = p5.Vector.dist(this.position, white_half_origin) - (sign.radius / 2 + this.radius)
		} else {
			let distance = (sign.radius / 2 - this.radius) - p5.Vector.dist(this.position, white_half_origin)
			// Determine if ball is on right side of sign
			let sign_center_to_ball = p5.Vector.sub(this.position, sign.origin)
			let sign_center_to_white = p5.Vector.sub(white_half_origin, sign.origin)
			let angle = sign_center_to_ball.angleBetween(sign_center_to_white)
			if (angle < 0) white_distance = distance
		}

		// Does currently collide with black half?
		let black_half_origin = createVector(0, sign.radius / 2)
		black_half_origin.rotate(sign.angle)
		black_half_origin.add(sign.origin)
		let black_distance = Number.MAX_VALUE
		if (this.color == 'white') {
			let distance = (sign.radius / 2 - this.radius) - p5.Vector.dist(this.position, black_half_origin)
			// Determine if ball is on right side of sign
			let sign_center_to_ball = p5.Vector.sub(this.position, sign.origin)
			let sign_center_to_black = p5.Vector.sub(black_half_origin, sign.origin)
			let angle = sign_center_to_ball.angleBetween(sign_center_to_black)
			if (angle < 0) black_distance = distance
		} else {
			black_distance = p5.Vector.dist(this.position, black_half_origin) - (sign.radius / 2 + this.radius)
		}

		// Deal with edge collision
		if (edge_distance < 0) {
			this.in_edge_collision = true;
			let surfaceNormal = p5.Vector.sub(sign.origin, this.position).normalize()
			let correction = p5.Vector.mult(surfaceNormal, (-edge_distance) + 1)
			this.position.add(correction)
			this.velocity.reflect(surfaceNormal.copy())
			return
		} else {
			this.in_edge_collision = false
		}

		// Deal with white half collision
		if (white_distance < 0) {
			this.in_white_collision = true
			let surfaceNormal = p5.Vector.sub(white_half_origin, this.position).normalize()
			if (this.color == 'white') surfaceNormal.rotate(PI)
			let correction = p5.Vector.mult(surfaceNormal, (-white_distance) + 1)
			this.position.add(correction)
			this.velocity.reflect(surfaceNormal.copy())
			return
		} else {
			this.in_white_collision = false
		}

		// Deal with black half collision
		if (black_distance < 0) {
			this.in_black_collision = true
			let surfaceNormal = p5.Vector.sub(this.position, black_half_origin).normalize()
			if (this.color == 'white') surfaceNormal.rotate(PI)
			let correction = p5.Vector.mult(surfaceNormal, (-black_distance) + 1)
			this.position.add(correction)
			this.velocity.reflect(surfaceNormal.copy())
			return
		} else {
			this.in_black_collision = false
		}
	}
}

class Sign {

	constructor(origin, radius) {
		this.origin = origin
		this.radius = radius
		this.angle = 0
	}

	update() {
		this.angle += 0.005	
	}

	show() {

		// Draw outline

		push()
		translate(this.origin.x, this.origin.y)
		rotate(this.angle)

		stroke('white')
		strokeWeight(line_thickness)

		fill('white')
		arc(0, 0, this.radius * 2, this.radius * 2, HALF_PI, -HALF_PI)
		fill('black')
		arc(0, 0, this.radius * 2, this.radius * 2, -HALF_PI, HALF_PI)

		fill('white')
		arc(0, -this.radius / 2, this.radius, this.radius, -HALF_PI, HALF_PI)
		fill('black')
		arc(0, this.radius / 2, this.radius, this.radius, HALF_PI, -HALF_PI)


		// strokeWeight(line_thickness)
		// noFill()

		// stroke('white')
		// ellipse(0, -this.radius / 2, this.radius, this.radius)

		// stroke('black')
		// ellipse(0, this.radius / 2, this.radius, this.radius)

		// stroke('green')
		// ellipse(0, 0, this.radius * 2)

		pop()
	}
}

function init() {
	createCanvas(windowWidth, windowHeight)

	ellipseMode(CENTER)

	let origin = createVector(width / 2, height / 2)
	let radius = min(width, height) * 0.45	// size is 90% of the smaller dimension
	sign = new Sign(origin, radius)
	sign.angle = 0

	white_dot = new Ball(origin.x, origin.y + radius * 0.5, radius * 0.1, 'white')
	black_dot = new Ball(origin.x, origin.y - radius * 0.5, radius * 0.1, 'black')

	//let f = createVector(random(-3, 3), random(-3, 3))
	//f.rotate(-1.3)

	white_dot.exert_force(createVector(random(-5, 5), random(-5, 5)))
	black_dot.exert_force(createVector(random(-5, 5), random(-5, 5)))

	console.group(`Yin Yang specific Information`)
	console.info(`radius is ${radius}`)
	console.groupEnd()
}

function resize() {
	sign.origin.set(width / 2, height / 2)
	sign.radius = min(width, height) * 0.45	// 90% of the smaller dimension
}

function update() {

	sign.update()
	white_dot.update()
	black_dot.update()
	white_dot.check_collision(sign)
	black_dot.check_collision(sign)
}

function paint() {

	background(50, 50, 100)

	sign.show()
	white_dot.show();
	black_dot.show();

}
