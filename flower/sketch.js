
var system


function spawnVine(angle) {
	// Pick a place on the screen border
	let origin = createVector()
	let direction = createVector()
	const items = ["left", "right", "top", "bottom"]
	switch (items[Math.floor(Math.random() * items.length)]) {
		case "left":
			origin.set(0, random(0, height))
			direction.set(1, 0)
			break;
		case "right":
			origin.set(width, random(0, height))
			direction.set(-1, 0)
			break;
		case "top":
			origin.set(random(0, width), 0)
			direction.set(0, 1)
			break;
		case "bottom":
			origin.set(random(0, width), height)
			direction.set(0, -1)
			break;
	}
	direction.rotate(angle);
	let p = system.spawn(origin.x, origin.y, random(300,600))
	p.velocity.set(direction)
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	print(`Canvas size is ${width}x${height}`)

	system = new ParticleSystem();
	let angle = random(-PI/4, PI/4)
	spawnVine(angle)
	spawnVine(angle)
	spawnVine(angle)
	
}

function tick() {
	system.update()
}

// Called once per frame
function draw() {

	tick()

	
	//clear()
	noFill()
	
	system.show();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  print(`Canvas size is ${width}x${height}`)
}
