const canvas = document.getElementById("canvas")
let frames = 0
const stopButton = document.getElementById("stop")
const startButton = document.getElementById("start")
const ctx = canvas.getContext("2d")

// ctx.beginPath()
// ctx.arc(100, 100, 20, 0, 2 * Math.PI)
// ctx.strokeStyle = "black"
// ctx.fillStyle = "green"
// ctx.fill()
// ctx.stroke()

// ctx.beginPath()
// ctx.arc(150, 200, 20, 0, Math.PI)
// ctx.strokeStyle = "blue"
// ctx.fillStyle = "yellow"
// ctx.fill()
// ctx.stroke()

// LEt's encapsulate our drawingCircle code in a function
// drawCircle(100, 200, 75, "magenta")
// drawCircle(175, 50, 25, "dodgerblue")

// function drawCircle(x, y, radius, color) {
// 	ctx.beginPath()
// 	ctx.arc(x, y, radius, 0, 2 * Math.PI)
// 	ctx.strokeStyle = "blue"
// 	ctx.fillStyle = color
// 	ctx.fill()
// 	ctx.stroke()
// }

class Circle {
	constructor(x, y, radius, color) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.draw()
		this.direction = {
			x: 1,
			y: 1,
		}
	}

	draw() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		ctx.strokeStyle = "blue"
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.stroke()
	}
	move() {
		this.x += 5 * this.direction.x
		this.y += 4 * this.direction.y
	}

	outOfBound() {
		if (this.x - this.radius < 0) {
			this.direction.x *= -1
			return true
		}
		if (this.y - this.radius < 0) {
			this.direction.y *= -1
		}
		if (this.x + this.radius > canvas.width) {
			this.direction.x *= -1
			return true
		}
		if (this.y + this.radius > canvas.height) {
			this.direction.y *= -1
			return true
		}
		return false
	}
}

class Background {
	constructor(image) {
		this.x = 0
		this.y = 0
		this.image = new Image()
		this.image.src = image
	}

	draw() {
		ctx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height)
		ctx.drawImage(
			this.image,
			this.x,
			this.y - canvas.height,
			canvas.width,
			canvas.height
		)
	}

	move() {
		// if (this.y >= canvas.height) {
		// 	this.y = 0
		// 	return
		// }
		this.y += 3
		this.y %= canvas.height
	}
}

const circle = new Circle(100, 200, 25, "magenta")
const circle2 = new Circle(10, 20, 5, "magenta")
const circle3 = new Circle(250, 300, 50, "magenta")
const circles = [circle, circle2, circle3]
const backgroundImage = new Background("./space.webp")
// drawCircle(175, 50, 25, "dodgerblue")

// setInterval(() => {
// 	if (circle.outOfBound()) {
// 		console.log("I am out of the screen !")
// 	}
// 	ctx.clearRect(0, 0, canvas.width, canvas.height)
// 	circle.move()
// 	circle.draw()
// 	console.log(circle.x, circle.y)
// }, 100)

function animate(counter) {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	backgroundImage.draw()
	backgroundImage.move()
	for (const circle of circles) {
		circle.outOfBound()
		circle.move()
		circle.draw()
	}
	// requestAnimationFrame call the provided function when the next Frame is available
	frames = requestAnimationFrame(animate)
}

// RequestAnimationFrame:
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

startButton.addEventListener("click", () => {
	startButton.disabled = true
	stopButton.disabled = false
	animate()
})
stopButton.addEventListener("click", () => {
	startButton.disabled = false
	stopButton.disabled = true

	cancelAnimationFrame(frames)
})
