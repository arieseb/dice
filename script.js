const newGame = document.getElementById('newGame')
const controlBtn = document.querySelectorAll('.control-btn')
const player1Name = document.getElementById('player1-name')
const player2Name = document.getElementById('player2-name')
const player1Current = document.getElementById('player1-current')
const player2Current = document.getElementById('player2-current')
const player1Global = document.getElementById('player1-global')
const player2Global = document.getElementById('player2-global')

const randomNumber = (number) => {
  return Math.ceil(Math.random() * number);
}

const defaultDisplay = () => {
  player1Name.innerText = player1.displayName
  player2Name.innerText = player2.displayName
  player1Global.innerText = player1.globalScore
  player2Global.innerText = player2.globalScore
  player1Current.innerText = player1.roundScore
  player2Current.innerText = player2.roundScore
}

class Game {
  constructor(players, roundNumber) {
    this.players = players
    this.roundNumber = 1
    this.winner = null //voir si pertinent
  }

  playNewGame = () => {
    player1 = new Player('player1', 'PLAYER 1', 0, 0)
    player2 = new Player('player 2', 'PLAYER 2', 0, 0)
    game = new Game([player1, player2], 1)
    defaultDisplay()
  }

  gameRound = (event) => {
    console.log(this.roundNumber)
    if (event.target.id === 'rollDice') {
      if (this.roundNumber % 2 !== 0) {
        this.players[0].rollDice()
      } else {
        this.players[1].rollDice()
      }
    } else {
      if (this.roundNumber % 2 !== 0) {
        this.players[0].holdScore()
        this.roundNumber ++
      } else {
        this.players[1].holdScore()
        this.roundNumber ++
      }      
    }
  }
}

class Player {
  constructor(id, displayName, globalScore, roundScore) {
    this.id = id
    this.displayName = displayName
    this.globalScore = 0
    this.roundScore = 0
  }

  rollDice = () => {
    let rollScore = randomNumber(6)
    //ajouter ici l'affichage du dé
    console.log(rollScore)
    if (rollScore !== 1) {
      this.roundScore += rollScore
    } else {
      this.roundScore = 0
      document.getElementById(`${this.id}-current`).innerText = this.roundScore
      game.roundNumber ++
    }
    document.getElementById(`${this.id}-current`).innerText = this.roundScore
  }

  holdScore = () => {
    this.globalScore += this.roundScore
    this.roundScore = 0
    document.getElementById(`${this.id}-current`).innerText = this.roundScore
    document.getElementById(`${this.id}-global`).innerText = this.globalScore
  }
}

let player1 = new Player('player1', 'PLAYER 1', 0, 0)
let player2 = new Player('player2', 'PLAYER 2', 0, 0)
let game = new Game([player1, player2], 1)

newGame.addEventListener('click', () => {
  game.playNewGame()
})

defaultDisplay()

const winEvent = new Promise ((resolve, reject) => {
  if (game.players[0].globalScore > 100 || game.players[1].globalScore > 100) {
    resolve()
  } else {
    reject()
  }
})

const gameWon = () => {
   if (game.players[0].globalScore < 100) {
    alert(`${game.players[0]} a gagné !`)
  } else if (game.players[1].globalScore < 100) {
    alert(`${game.players[1]} a gagné !`)
  }
}

const error = () => {
  alert('Une erreur s\'est produite !')
}

for (div of controlBtn) {
  div.addEventListener('click', game.gameRound)
}

winEvent().then(gameWon, error)

/*if (game.players[0].globalScore < 100 || game.players[1].globalScore < 100) {
  for (div of controlBtn) {
    div.addEventListener('click', game.gameRound)
  }
} else if (game.players[0].globalScore < 100) {
  alert(`${game.players[0]} a gagné !`)
} else if (game.players[1].globalScore < 100) {
  alert(`${game.players[1]} a gagné !`)
}*/

/*for (div of controlBtn) {
  div.addEventListener('click', game.gameRound)
}*/

//} while (player1.globalScore < 100 || player2.globalScore < 100)*/