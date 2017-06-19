var canvas
var ctx
var start
var random
var gun

const canvasSize = 600
const tileSize = 8
const numTiles = canvasSize / tileSize

var grid = initGrid(numTiles)
var nextGrid = initGrid(numTiles)

window.onload = function () {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  start = document.getElementById('start')
  random = document.getElementById('random')
  gun = document.getElementById('gun')
  ctx.fillStyle = 'green'

  canvas.addEventListener('click', drawCell)

  random.addEventListener('click', function (event) {
    event.preventDefault()
    fill()
    setInterval(game, 1000 / 20)
  })

  gun.addEventListener('click', function (event) {
      event.preventDefault()
      drawGun()
    })

  start.addEventListener('click', function (event) {
    event.preventDefault()
    update()
    setInterval(game, 1000 / 30)
  })
}

function drawCell(e) {
  var x
  var y
  if (e.pageX || e.pageY) { 
    x = e.pageX
    y = e.pageY
  }
  else { 
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  } 
  x -= canvas.offsetLeft
  y -= canvas.offsetTop

  var cellX = Math.floor(x / tileSize)
  var cellY = Math.floor(y / tileSize)
  grid[cellX][cellY] = 1
  render()
}


function game () {
  render()
  update()
}

function render () {
  ctx.clearRect(0, 0, numTiles*tileSize, numTiles*tileSize)
  for (var x = 0; x < numTiles; x++) {
    for (var y = 0; y < numTiles; y++) {
      if (grid[x][y] === 1) {
        console.log(x + " " + y)
        ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize)
      }
    }
  }
}

function update () {
  var liveCells = 0
  for (var x = 1; x < numTiles -1; x++) {
    for (var y = 1; y < numTiles -1; y++) {
      liveCells = 0
      for (var j = x - 1; j < x + 2; j++) {
        for (var k = y - 1; k < y + 2; k++) {
          if (j === x && k === y) { continue }
          liveCells += grid[j][k]
        }
      }

      if (liveCells === 2) {
        nextGrid[x][y] = grid[x][y]
      } else if (liveCells === 3) {
        nextGrid[x][y] = 1
      } else {
        nextGrid[x][y] = 0
      }
    }
  }
  for (var i = 1; i < numTiles - 1; i++) { 
      nextGrid[i][0] = nextGrid[i][numTiles - 3];
      nextGrid[i][numTiles - 2] = nextGrid[i][1];
      nextGrid[0][i] = nextGrid[numTiles - 3][i];
      nextGrid[numTiles - 2][i] = nextGrid[1][i];
  }
  var temp = grid
  grid = nextGrid
  nextGrid = temp
}

function initGrid (size) {
  var array = []
  for (let i = 0; i < size; i++) {
    array[i] = []
  }
  for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
      array[x][y] = 0
    }
  }
  return array
}

function fill () {
  for (let i = 20; i < numTiles - 20; i++) {
    for (let j = 20; j < numTiles - 20; j++) {
      grid[i][j] = Math.round(Math.random())
    }
  }
}

function drawGun() {
  grid[1][5] = 1
  grid[2][5] = 1
  grid[1][5] = 1
  grid[1][6] = 1
  grid[2][6] = 1
  grid[11][5] = 1
  grid[11][6] = 1
  grid[11][7] = 1
  grid[12][4] = 1
  grid[12][8] = 1
  grid[13][3] = 1
  grid[13][9] = 1
  grid[14][3] = 1
  grid[14][9] = 1
  grid[15][6] = 1
  grid[16][8] = 1
  grid[16][4] = 1
  grid[17][5] = 1
  grid[17][6] = 1
  grid[17][7] = 1
  grid[18][6] = 1
  grid[21][3] = 1
  grid[21][4] = 1
  grid[21][5] = 1
  grid[22][3] = 1
  grid[22][4] = 1
  grid[22][5] = 1
  grid[23][2] = 1
  grid[23][6] = 1
  grid[25][1] = 1
  grid[25][2] = 1
  grid[25][6] = 1
  grid[25][7] = 1
  grid[35][3] = 1
  grid[35][4] = 1
  grid[36][3] = 1
  grid[36][4] = 1
  render()
}










