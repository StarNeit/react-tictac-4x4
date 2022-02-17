import React from "react"
import Row from "../components/Row"
import "./App.css"

var symbolsMap = {
  2: ["marking", "32"],
  0: ["marking marking-x", 9587],
  1: ["marking marking-o", 9711],
  3: ["marking marking-d", 9651],
}

var patterns = [
  //horizontal
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  //vertical
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  //diagonal
  [0, 5, 10, 15],
  [12, 9, 6, 3],
]

var AIScore = { 2: 1, 0: 2, 1: 0 }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardState: new Array(16).fill(2),
      turn: 0,
      active: true,
      mode: "3P",
    }
    this.handleNewMove = this.handleNewMove.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.processBoard = this.processBoard.bind(this)
    this.makeAIMove = this.makeAIMove.bind(this)
  }

  processBoard() {
    var won = false
    patterns.forEach((pattern) => {
      var firstMark = this.state.boardState[pattern[0]]

      if (firstMark !== 2) {
        var marks = this.state.boardState.filter((mark, index) => {
          return pattern.includes(index) && mark === firstMark //looks for marks matching the first in pattern's index
        })

        if (marks.length === 4) {
          document.querySelector("#message1").innerHTML =
            String.fromCharCode(symbolsMap[marks[0]][1]) + " wins!"
          document.querySelector("#message1").style.display = "block"
          pattern.forEach((index) => {
            var id = index + "-" + firstMark
            document.getElementById(id).parentNode.style.background = "#d4edda"
          })
          this.setState({ active: false })
          won = true
        }
      }
    })

    if (!this.state.boardState.includes(2) && !won) {
      document.querySelector("#message2").innerHTML = "Game Over - It's a draw"
      document.querySelector("#message2").style.display = "block"
      this.setState({ active: false })
    } else if (this.state.mode === "AI" && this.state.turn === 1 && !won) {
      this.makeAIMove()
    }
  }

  makeAIMove() {
    var emptys = []
    var scores = []
    this.state.boardState.forEach((mark, index) => {
      if (mark === 2) emptys.push(index)
    })

    emptys.forEach((index) => {
      var score = 0
      patterns.forEach((pattern) => {
        if (pattern.includes(index)) {
          var xCount = 0
          var oCount = 0
          var dCount = 0
          pattern.forEach((p) => {
            if (this.state.boardState[p] === 0) xCount += 1
            else if (this.state.boardState[p] === 4) dCount += 1
            else if (this.state.boardState[p] === 1) oCount += 1
            score += p === index ? 0 : AIScore[this.state.boardState[p]]
          })
          if (xCount >= 2) score += 10
          if (oCount >= 2) score += 20
          if (dCount >= 2) score += 30
        }
      })
      scores.push(score)
    })

    var maxIndex = 0
    scores.reduce(function (maxVal, currentVal, currentIndex) {
      if (currentVal >= maxVal) {
        maxIndex = currentIndex
        return currentVal
      }
      return maxVal
    })
    this.handleNewMove(emptys[maxIndex])
  }

  handleReset(e) {
    if (e) e.preventDefault()
    document
      .querySelectorAll(".alert")
      .forEach((el) => (el.style.display = "none"))
    this.setState({
      boardState: new Array(16).fill(2),
      turn: 0,
      active: true,
    })
  }
  handleNewMove(id) {
    this.setState(
      (prevState) => {
        if (prevState.turn !== 1) {
          return {
            boardState: prevState.boardState
              .slice(0, id)
              .concat(prevState.turn)
              .concat(prevState.boardState.slice(id + 1)),
            turn: (prevState.turn + 1) % 2,
          }
        } else {
          return {
            boardState: prevState.boardState
              .slice(0, id)
              .concat(prevState.turn)
              .concat(prevState.boardState.slice(id + 1)),
            turn: 3,
          }
        }
      },
      () => {
        this.processBoard()
      }
    )
  }

  render() {
    const rows = []
    for (var i = 0; i < 4; i++)
      rows.push(
        <Row
          row={i}
          symbolsMap={symbolsMap}
          boardState={this.state.boardState}
          onNewMove={this.handleNewMove}
          active={this.state.active}
        />
      )
    return (
      <div className="root">
        <div class="container jumbotron" id="container">
          <h3 className="main-title">TIC TAC TOE GAME</h3>
          <p className="turn-text">
            {String.fromCharCode(symbolsMap[this.state.turn][1])} &nbsp;'s turn
          </p>

          <div className="board">
            {rows}
            <a className="reset-button" onClick={this.handleReset}>
              Reset board
            </a>
          </div>

          <p class="alert alert-success" role="alert" id="message1"></p>
          <p class="alert alert-info" role="alert" id="message2"></p>
        </div>
        <p></p>
      </div>
    )
  }
}

export default App
