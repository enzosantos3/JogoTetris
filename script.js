const canvas = document.getElementById("tetris")
const context = canvas.getContext("2d")
context.scale(20, 20)

const nextCanvas = document.getElementById("next")
const nextContext = nextCanvas.getContext("2d")
nextContext.scale(20, 20)

const PIECES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  O: [
    [4, 4],
    [4, 4],
  ],
  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
}

const COLORS = [
  null,
  "#0ff", // I - Cyan
  "#00f", // J - Blue
  "#f90", // L - Orange
  "#ff0", // O - Yellow
  "#0f0", // S - Green
  "#909", // T - Purple
  "#f00", // Z - Red
]

let score = 0
let level = 1
let dropInterval = 1000
let lastTime = 0
let dropCounter = 0
let nextPiece = null

function createMatrix(w, h) {
  const matrix = []
  while (h--) {
    matrix.push(new Array(w).fill(0))
  }
  return matrix
}

function drawMatrix(matrix, offset, ctx = context) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = COLORS[value]
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1)

        ctx.strokeStyle = "#000"
        ctx.lineWidth = 0.05
        ctx.strokeRect(x + offset.x, y + offset.y, 1, 1)
      }
    })
  })
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value
      }
    })
  })
}

function collide(arena, player) {
  const m = player.matrix
  const o = player.pos
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true
      }
    }
  }
  return false
}

function playerDrop() {
  player.pos.y++
  if (collide(arena, player)) {
    player.pos.y--
    merge(arena, player)
    arenaSweep()
    playerReset()
    updateScore()
  }
  dropCounter = 0
}

function playerMove(dir) {
  player.pos.x += dir
  if (collide(arena, player)) {
    player.pos.x -= dir
  }
}

function getRandomPiece() {
  const pieces = "IJLOSTZ"
  const piece = pieces[Math.floor(Math.random() * pieces.length)]
  return PIECES[piece]
}

function playerReset() {
  if (nextPiece === null) {
    nextPiece = getRandomPiece()
  }

  player.matrix = nextPiece
  nextPiece = getRandomPiece()

  drawNextPiece()

  player.pos.y = 0
  player.pos.x = Math.floor(arena[0].length / 2) - Math.floor(player.matrix[0].length / 2)

  if (collide(arena, player)) {
    arena.forEach((row) => row.fill(0))
    score = 0
    level = 1
    dropInterval = 1000
    updateScore()
    alert("Game Over!")
  }
}

function drawNextPiece() {
  nextContext.fillStyle = "#333"
  nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height)

  if (nextPiece) {
    const offset = {
      x: (4 - nextPiece[0].length) / 2,
      y: (4 - nextPiece.length) / 2,
    }
    drawMatrix(nextPiece, offset, nextContext)
  }
}

function playerRotate() {
  const pos = player.pos.x
  let offset = 1
  rotate(player.matrix)

  while (collide(arena, player)) {
    player.pos.x += offset
    offset = -(offset + (offset > 0 ? 1 : -1))
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -1)
      player.pos.x = pos
      return
    }
  }
}

function rotate(matrix, dir = 1) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      ;[matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]]
    }
  }

  if (dir > 0) {
    matrix.forEach((row) => row.reverse())
  } else {
    matrix.reverse()
  }
}

function arenaSweep() {
  let linesCleared = 0

  outer: for (let y = arena.length - 1; y >= 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer
      }
    }

    const row = arena.splice(y, 1)[0].fill(0)
    arena.unshift(row)
    ++y
    linesCleared++
  }

  if (linesCleared > 0) {
    score += linesCleared * linesCleared * 100

    const newLevel = Math.floor(score / 500) + 1
    if (newLevel > level) {
      level = newLevel
      dropInterval = Math.max(100, 1000 - (level - 1) * 100)
    }
  }
}

function updateScore() {
  document.getElementById("score").innerText = "Score: " + score
  document.getElementById("level").innerText = "Level: " + level
}

function draw() {
  context.fillStyle = "#222"
  context.fillRect(0, 0, canvas.width, canvas.height)

  drawMatrix(arena, { x: 0, y: 0 })
  drawMatrix(player.matrix, player.pos)
}

function update(time = 0) {
  const deltaTime = time - lastTime
  lastTime = time

  dropCounter += deltaTime
  if (dropCounter > dropInterval) {
    playerDrop()
  }

  draw()
  requestAnimationFrame(update)
}

const arena = createMatrix(12, 20)
const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    playerMove(-1)
  } else if (event.key === "ArrowRight") {
    playerMove(1)
  } else if (event.key === "ArrowDown") {
    playerDrop()
  } else if (event.key === "ArrowUp") {
    playerRotate()
  }
})

playerReset()
updateScore()
update()