
var system
var p
//var t = 0

function setup() {
	createCanvas(windowWidth, windowHeight)
	print(`Canvas size is ${width}x${height}`)

	system = new ParticleSystem();
	p = system.spawn(width/2, height, 500)
	p.velocity.set(0, -1)
	//background(0, 0, 100)
	
}

function tick() {
	//++t
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
