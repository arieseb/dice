//Déclaration de tous les éléments du DOM nécessaires
const newGame = document.getElementById('newGame')
const controlBtn = document.querySelectorAll('.control-btn')
const player1Name = document.getElementById('player1-name')
const player2Name = document.getElementById('player2-name')
const player1Current = document.getElementById('player1-current')
const player2Current = document.getElementById('player2-current')
const player1Global = document.getElementById('player1-global')
const player2Global = document.getElementById('player2-global')
const diceDisplay = document.querySelector('figure')
const player1Column = document.querySelector('.player1-wrapper')
const player2Column = document.querySelector('.player2-wrapper')
const dot = document.createElement('span')
const victory = document.querySelector('.victory-modal')
const victoryMessage = document.querySelector('.notification')
const rules = document.querySelector('.rules-modal')
const rulesBtn = document.getElementById('rules')

//Evénement écoutant le bouton qui affiche les règles
rulesBtn.addEventListener('click', () => {
  rules.classList.add('is-active')
})

//Icône indiquant le tour de jeu à injecter dans le DOM
dot.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="2rem" fill="hsl(348, 100%, 61%)" class="bi bi-caret-left-fill" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>'

//Fonction générant un chiffre aléatoire
const randomNumber = (number) => {
  return Math.ceil(Math.random() * number)
}

//Fonction définissant l'affichage par défaut
const defaultDisplay = () => {
  player1Name.innerText = player1.displayName
  player2Name.innerText = player2.displayName
  player1Global.innerText = player1.globalScore
  player2Global.innerText = player2.globalScore
  player1Current.innerText = player1.roundScore
  player2Current.innerText = player2.roundScore
  player1Column.classList.add('has-background-white-ter')
  player1Name.classList.add('has-text-weight-semibold')
  player1Name.append(dot)
}

//Classe définissant l'objet Game et ses méthodes d'instance associées
class Game {
  constructor(players, roundNumber) {
    this.players = players
    this.roundNumber = 1
  }

  //Méthode d'instance créant une nouvelle partie
  playNewGame = () => {
    player1 = new Player('player1', 'PLAYER 1', 0, 0)
    player2 = new Player('player 2', 'PLAYER 2', 0, 0)
    game = new Game([player1, player2], 1)
    defaultDisplay()
  }

  //Méthode d'instance gérant un tour de jeu
  gameRound = (event) => {
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

  //Méthode d'instance affichant le message de victoire
  winMessage = (winner) => {
    victory.classList.add('is-active')
    victoryMessage.innerText = `Bravo, ${winner} a gagné la partie !`
    this.playNewGame()
  }
}

//Classe définissant l'objet Player et ses méthodes d'instance associées
class Player {
  constructor(id, displayName, globalScore, roundScore, rollScore) {
    this.id = id
    this.displayName = displayName
    this.globalScore = 0
    this.roundScore = 0
    this.rollScore = 0
  }

  //Méthode d'instance gérant le lancer et l'affichage du dé
  rollDice = () => {
    this.rollScore = randomNumber(6)
    switch (this.rollScore) {
      case 1:
        diceDisplay.innerHTML = '<img src="images/face_1.png" alt="Dice face 1" width="150" height="150">'
        break
      case 2:
        diceDisplay.innerHTML = '<img src="images/face_2.png" alt="Dice face 2" width="150" height="150">'
        break
      case 3:
        diceDisplay.innerHTML = '<img src="images/face_3.png" alt="Dice face 3" width="150" height="150">'
        break
      case 4:
        diceDisplay.innerHTML = '<img src="images/face_4.png" alt="Dice face 4" width="150" height="150">'
        break
      case 5:
        diceDisplay.innerHTML = '<img src="images/face_5.png" alt="Dice face 5" width="150" height="150">'
        break 
      case 6:
        diceDisplay.innerHTML = '<img src="images/face_6.png" alt="Dice face 6" width="150" height="150">'
        break 
      default:
        diceDisplay.innerHTML = '<img src="images/placeholder.png" alt="Empty dice" width="150" height="150">'
        break     
    }
    if (this.rollScore !== 1) {
      this.roundScore += this.rollScore
    } else {
      this.roundScore = 0
      document.getElementById(`${this.id}-current`).innerText = this.roundScore
      game.roundNumber ++
      return
    }
    document.getElementById(`${this.id}-current`).innerText = this.roundScore
  }

  //Méthode d'instance définissant le comportement de la fonctionnalité Hold
  holdScore = () => {
    this.globalScore += this.roundScore
    this.roundScore = 0
    document.getElementById(`${this.id}-current`).innerText = this.roundScore
    document.getElementById(`${this.id}-global`).innerText = this.globalScore
    if (this.globalScore < 100 ) {
      return
    } else {
      game.winMessage(this.displayName)
    }
  }

  //Méthode d'instance permettant de styliser le tour de jeu
  displayPlayerTurn = (event) => {
    if (event.target.id === 'hold' || event.target.id === 'rollDice' && this.rollScore === 1) {
      if (game.roundNumber % 2 !== 0) {
        player1Column.classList.add('has-background-white-ter')
        player2Column.classList.remove('has-background-white-ter')
        player1Name.classList.add('has-text-weight-semibold')
        player2Name.classList.remove('has-text-weight-semibold')
        player1Name.append(dot)
      } else {
        player1Column.classList.remove('has-background-white-ter')
        player2Column.classList.add('has-background-white-ter')
        player2Name.classList.add('has-text-weight-semibold')
        player1Name.classList.remove('has-text-weight-semibold')
        player2Name.append(dot)
      }
    }
  }
}

//Déclaration des instances
let player1 = new Player('player1', 'PLAYER 1', 0, 0)
let player2 = new Player('player2', 'PLAYER 2', 0, 0)
let game = new Game([player1, player2], 1)

//Evénement écoutant le bouton qui lance une nouvelle partie
newGame.addEventListener('click', () => {
  game.playNewGame()
})

//Appel de la fonction définissant l'affichage par défaut
defaultDisplay()

//Boucle sur les boutons Roll et Hold, permettant de gérer les événements associés à ceux-ci
for (button of controlBtn) {
  button.addEventListener('click', game.gameRound)
  for (player of game.players) {
    button.addEventListener('click', player.displayPlayerTurn)
  }
}

//Fonction permettant de fermer les fenêtres modales
(document.querySelectorAll('.modal-background, .modal-close') || []).forEach((close) => {
  const target = close.closest('.modal')
  close.addEventListener('click', () => {
    target.classList.remove('is-active')
  })
})