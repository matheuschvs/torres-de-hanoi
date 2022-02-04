let step
let selectedTower
let difficulty
let currentDisc
let gameStarted = false
let counter = 0

const towers = document.querySelectorAll('#towers ul')
towers.forEach(tower => tower.addEventListener('click', handleTowerClick))

const startGameBtn = document.querySelector('#startGameBtn')
startGameBtn.addEventListener('click', handleStartGame)

function handleStartGame() {
  resetGame()

  const levelSelector = document.querySelector('#levelSelector')
  difficulty = Number(levelSelector.value)

  createDiscs(difficulty, towers[0])

  gameStarted = true
  displayMessage('Jogo iniciado, selecione o disco para mover.')
}

function resetGame() {
  const discHolder = document.querySelector('#discHolder')
  discHolder.innerHTML = ''
  currentDisc = null

  setCounter(0)

  step = 'PICK'
  towers.forEach(tower => tower.innerHTML = '')
}

function createDiscs(level, firstTower) {
  for (let discNumber = level; discNumber >= 1; discNumber -= 1) {
    const disc = createDisc(discNumber, level)

    insertDisc(disc, firstTower)
  }
}

function createDisc(discNumber, level) {
  const disc = document.createElement('li')
  const tower = document.querySelector('#towers ul')
  const width = discNumber * (tower.offsetWidth / level)

  disc.id = `disc${discNumber}`
  disc.classList.add('disc')
  disc.style.width = `${width}px`
  disc.style.background = generateRandomColor()

  return disc
}

function insertDisc(disc, tower) {
  return tower.appendChild(disc)
}

function handleTowerClick(event) {
  if (!gameStarted) {
    displayMessage('É preciso iniciar o jogo primeiro!')
    return
  }

  selectedTower = event.currentTarget

  const discHolder = document.querySelector('#discHolder')

  if (step === 'PICK') {
    currentDisc = pickDisc(selectedTower)

    if (!currentDisc) {
      displayMessage('Falha ao pegar o disco.')
      return
    }

    discHolder.appendChild(currentDisc)
    setCounter(counter + 1)
    displayMessage('Disco selecionado, selecione torre para inserir.')
  } else {
    if (checkIfCanPutDisk()) {
      displayMessage('Disco inserido, selecione o próximo disco.')
      insertDisc(currentDisc, selectedTower)
    } else {
      displayMessage('Impossível inserir disco nesta torre.')
      return
    }
  }

  if (checkVictory()) {
    displayMessage('Parabéns, você venceu o jogo!')
  }

  toggleStep(step)
}

function checkIfCanPutDisk() {
  return selectedTower.childElementCount === 0
    || selectedTower.lastElementChild.id > currentDisc.id
}

function pickDisc(tower) {
  if (tower.childElementCount > 0) {
    return tower.lastElementChild
  }
  return null
}

function toggleStep(currentStep) {
  step = currentStep === 'PICK' ? 'PUT' : 'PICK'
}

function setCounter(newCounter) {
  const counterDisplay = document.querySelector('#counter')

  counter = newCounter
  counterDisplay.innerText = `${counter}`
}

function displayMessage(message) {
  const display = document.querySelector('#display')

  display.innerText = message
}

function checkVictory() {
  return towers[1].childElementCount === difficulty
    || towers[2].childElementCount === difficulty
}

function generateRandomColor() {
  return `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
