import Background from "./background.js"
import Pokemon from "./pokemon.js"
import Player from "./player.js"

class Game {
	constructor(ctx, canvas, pokemonsSource) {
		this.ctx = ctx
		this.canvas = canvas
		this.pokemonsSource = pokemonsSource
		this.animateId = null
		this.background = null
		this.pokemons = []
		this.player = null
		this.pressedKeys = {
			up: false,
			down: false,
			right: false,
			left: false,
		}
		this.init()
	}

	init() {
		this.background = new Background(
			"./assets/space.webp",
			this.canvas,
			this.ctx
		)
		for (const src of this.pokemonsSource) {
			this.pokemons.push(new Pokemon(src, this.ctx, this.canvas))
		}
		this.player = new Player("./assets/pokeball.png", this.ctx, this.canvas)
		this.createEventListeners()
	}

	start() {
		this.animateId = requestAnimationFrame(() => this.animate())
	}
	stop() {
		console.log(this.animateId)
		cancelAnimationFrame(this.animateId)
	}
	animate() {
		this.clear()
		this.handleBackground()
		for (const pokemon of this.pokemons) {
			this.handlePokemon(pokemon)
		}
		this.player.draw()
		for (const key in this.pressedKeys) {
			if (this.pressedKeys[key]) {
				this.player.move(key)
			}
		}

		this.animateId = requestAnimationFrame(() => this.animate())
	}

	handlePokemon(pokemon) {
		pokemon.outOfBound()
		if (pokemon.collideWithPlayer(this.player)) {
			this.stop()
			this.showEndScreen()
		}
		pokemon.move()
		pokemon.draw()
	}

	handleBackground() {
		this.background.draw()
		this.background.move()
	}
	createEventListeners() {
		document.addEventListener("keydown", (event) => {
			// console.log(event.key)
			switch (event.key) {
				case "ArrowRight":
					this.pressedKeys.right = true
					break
				case "ArrowLeft":
					this.pressedKeys.left = true
					break
				case "ArrowUp":
					this.pressedKeys.up = true
					break
				case "ArrowDown":
					this.pressedKeys.down = true
					break
			}
		})
		document.addEventListener("keyup", (event) => {
			// console.log(event.key)
			switch (event.key) {
				case "ArrowRight":
					this.pressedKeys.right = false
					break
				case "ArrowLeft":
					this.pressedKeys.left = false
					break
				case "ArrowUp":
					this.pressedKeys.up = false
					break
				case "ArrowDown":
					this.pressedKeys.down = false
					break
			}
		})
	}
	clear() {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height)
	}

	showEndScreen() {
		const modal = document.getElementById("modal")
		modal.showModal()
	}
}

export default Game
