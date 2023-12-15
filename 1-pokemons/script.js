import Game from "./game.js"

const canvas = document.getElementById("canvas")
const stopButton = document.getElementById("stop")
const startButton = document.getElementById("start")
const ctx = canvas.getContext("2d")
const pokemons = [
	"./assets/bulbasaur.png",
	"./assets/squirtle.png",
	"./assets/charmander.png",
]
const game = new Game(ctx, canvas, pokemons)

// requestAnimationFrame call the provided function when the next Frame is available

startButton.addEventListener("click", () => {
	game.start()
	startButton.disabled = true
	stopButton.disabled = false
})

stopButton.addEventListener("click", () => {
	startButton.disabled = false
	stopButton.disabled = true
	game.stop()
})
