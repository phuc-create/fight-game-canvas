const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7

class Sprite {
    constructor({ position, velocity, offset }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.isAttacking = false
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //if (this.isAttacking) {
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
        )
        //}
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            if (this.isAttacking) {
                this.isAttacking = false
            }
        }, 100)
    }
}

// Player
const player = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    offset: { x: 0, y: 0 }
})

const enemy = new Sprite({
    position: { x: 200, y: 150 },
    velocity: { x: 0, y: 0 },
    offset: { x: 50, y: 0 }
})

player.draw()
enemy.draw()

let keys = {
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

const animate = () => {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    if (keys.ArrowLeft.pressed) {
        player.velocity.x = -3
    } else if (keys.ArrowRight.pressed) {
        player.velocity.x = 3
    }

    // Detect for collision for player
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height &&
        player.isAttacking

    ) {
        console.log("attacked");
    }
}

animate()

window.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true
            break;
        case "ArrowUp":
            player.velocity.y = -20
            break;
        case " ":
            player.attack()
        default:
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false
            break;
        case "ArrowUp":
            player.velocity.y = 0
            break;
        default:
            break;
    }
})
