const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = canvas.parentElement.clientWidth
canvas.height = canvas.parentElement.clientHeight - 20

let points = []
let mouse = {
	x: undefined,
	y: undefined
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

window.addEventListener('resize', () => {
	canvas.width = canvas.parentElement.clientWidth
	canvas.height = canvas.parentElement.clientHeight
})
window.addEventListener('mousemove', e => {
	mouse.x = e.x
	mouse.y = e.y
})

class point {
	constructor() {
		this.x = Math.random() * (canvas.width - 10) + 5
		this.y = Math.random() * (canvas.height - 10) + 5
		this.dx = Math.random() * 0.2 - 0.1
		this.dy	= Math.random() * 0.2 - 0.1
		this.c = 0
		this.r = 0.5
	}
	draw() {
		c.beginPath()
		if (currentTheme == 'light-theme.css')
			c.fillStyle = '#FFEE58'
		else
			c.fillStyle = '#2196F3'
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		c.fill()
		c.closePath()
	}
	update() {
		if (this.x > canvas.width || this.x < 0) this.dx = -this.dx
		if (this.y > canvas.height || this.y < 0) this.dy = -this.dy
		if (distance(mouse.x, mouse.y, this.x, this.y) < 100) {
			for (let j = 0; j < points.length; j++) {
				if (distance(this.x, this.y, points[j].x, points[j].y) < 70 && this.c < 3
				 && points[j].c < 3 && distance(mouse.x, mouse.y, points[j].x, points[j].y) < 100) {
					c.beginPath()
					if (currentTheme == 'light-theme.css')
						c.strokeStyle = '#FFF176'
					else
						c.strokeStyle = '#2196F3'
					c.moveTo(this.x, this.y)
					c.lineTo(points[j].x, points[j].y)
					c.stroke()
					c.closePath()
					this.c++
				}
			}
			this.c = 0
		}
		if (distance(mouse.x, mouse.y, this.x, this.y) < 150 && this.r < 3)
			this.r += 0.2
		else if (this.r > 0.1)
			this.r -= 0.1
		else this.r = 0

		this.x += this.dx
		this.y += this.dy
		this.draw()
	}
}
let anime
function animate() {
	anime = requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)
	points.forEach(p => {p.update()})
}
function init() {
	for (let i = 0; i < Math.floor(window.innerWidth * window.innerHeight / 2000); i++)
		points.push(new point())
	animate()
}
init()
