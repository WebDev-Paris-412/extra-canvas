export default class Player {
	constructor(image, ctx, canvas) {
		this.height = 25
		this.width = 25
		this.image = new Image()
		this.image.src = image
		this.ctx = ctx
		this.canvas = canvas
		this.x = canvas.width / 2 - this.width / 2
		this.y = canvas.height - 100
	}

	draw() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

		// console.log(this.image, this.x, this.y, this.width, this.height)
	}

	move(direction) {
		switch (direction) {
			case "up":
				this.moveUp()
				break
			case "down":
				this.moveDown()
				break
			case "left":
				this.moveLeft()
				break
			case "right":
				this.moveRight()
				break
		}
	}
	topEdge() {
		return this.y
	}
	bottomEdge() {
		return this.y + this.height
	}
	leftEdge() {
		return this.x
	}
	rightEdge() {
		return this.x + this.width
	}
	moveUp() {
		this.y -= 7
	}
	moveDown() {
		this.y += 7
	}
	moveRight() {
		this.x += 7
	}
	moveLeft() {
		this.x -= 7
	}
}
