class Pokemon {
	constructor(image, ctx, canvas) {
		this.width = 75
		this.height = 75
		this.canvas = canvas
		this.x = this.getRandom(this.canvas.width, this.width)
		this.y = this.getRandom(this.canvas.height, this.height)
		this.ctx = ctx
		this.image = new Image()
		this.image.src = image
		this.direction = {
			x: 1,
			y: 1,
		}
		this.draw()
	}
	getRandom(max, imageSize) {
		return Math.floor(Math.random() * max) % (max - imageSize)
	}

	draw() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
	}
	move() {
		this.x += 5 * this.direction.x
		this.y += 4 * this.direction.y
	}
	leftEdge() {
		return this.x
	}
	rightEdge() {
		return this.x + this.width
	}
	topEdge() {
		return this.y
	}
	bottomEdge() {
		return this.y + this.height
	}

	collideWithPlayer(player) {
		const isInY =
			this.bottomEdge() > player.topEdge() &&
			this.topEdge() < player.bottomEdge()
		const isInX =
			this.rightEdge() > player.leftEdge() &&
			this.leftEdge() < player.rightEdge()
		console.log(isInX, isInY)

		return isInX && isInY
	}

	outOfBound() {
		if (this.leftEdge() < 0) {
			return (this.direction.x *= -1)
		}
		if (this.topEdge() < 0) {
			return (this.direction.y *= -1)
		}
		if (this.rightEdge() > this.canvas.width) {
			return (this.direction.x *= -1)
		}
		if (this.bottomEdge() > this.canvas.height) {
			return (this.direction.y *= -1)
		}
	}
}

export default Pokemon
