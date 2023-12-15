class Background {
	constructor(image, canvas, ctx) {
		this.x = 0
		this.y = 0
		this.ctx = ctx
		this.canvas = canvas
		this.image = new Image()
		this.image.src = image
	}

	draw() {
		this.ctx.drawImage(
			this.image,
			this.x,
			this.y,
			this.canvas.width,
			this.canvas.height
		)
		this.ctx.drawImage(
			this.image,
			this.x,
			this.y - this.canvas.height,
			this.canvas.width,
			this.canvas.height
		)
	}

	move() {
		// if (this.y >= this.canvas.height) {
		// 	this.y = 0
		// 	return
		// }
		this.y += 3
		this.y %= this.canvas.height
	}
}

export default Background
