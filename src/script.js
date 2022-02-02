let step
let selectedTower
let difficulty = 5

const startGame = towers => {
  createDiscs(difficulty, towers[0])
  step = 'pick'
}

const handleSetSelectedTower = event => {
  selectedTower = event.target
}

const createDiscs = (level, firstTower) => {
  for (let discNumber = level; discNumber >= 1; discNumber -= 1) {
    const disc = createDisc(discNumber, level)

    insertDisc(disc, firstTower)
  }
}

const createDisc = (discNumber, level) => {
  const disc = document.createElement('li')
  const tower = document.querySelector('ul')
  const width = discNumber * (tower.offsetWidth / level)

  disc.classList.add('disc')
  disc.style.width = `${width}px`

  return disc
}

const insertDisc = (disc, tower) => {
  tower.appendChild(disc)
}

const towers = document.querySelectorAll('ul')
towers.forEach(tower => tower.addEventListener('click', handleSetSelectedTower))

startGame(towers)
