/*
 * Foundation code for sketches
 * Some custom hooks, vars and key handlers
 */

var ticks

function setup() {
    createCanvas(windowWidth, windowHeight)
    console.group(`Information`)
    const name = typeof SKETCH_NAME === "undefined"? "<SKETCH_NAME not set>" : SKETCH_NAME
    const version = typeof SKETCH_VERSION === "undefined"? "<SKETCH_VERSION not set>" : "v" + SKETCH_VERSION
    console.info(`Sketch: ${name} ${version}`)
    console.info(`Canvas size is ${width}x${height}`)
    console.info(`Pixel density: ${pixelDensity()}`)
    console.groupEnd()

    ticks = 0

    if (typeof init === "function") init()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    console.info(`Canvas size is ${width}x${height}`)
    if (typeof resize === "function") resize()
}

function draw() {
    ++ticks
    if (typeof update === "function") update()
    if (typeof paint === "function") paint()
}

function keyTyped() {
    switch (key) {
        case 's':
            const name = typeof SKETCH_NAME === "undefined"? "<SKETCH_NAME not set>" : SKETCH_NAME
            const version = typeof SKETCH_VERSION === "undefined"? "<SKETCH_VERSION not set>" : "v" + SKETCH_VERSION
            saveCanvas(`${name}_${version}`, 'png')
            break
    }
}