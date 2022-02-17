import React from "react"

const Column = (props) => {
  const handleNewMove = (e) => {
    if (!props.active) {
      document.querySelector("#message1").style.display = "none"
      document.querySelector("#message2").innerHTML =
        "Game is already over! Reset if you want to play again."
      document.querySelector("#message2").style.display = "block"
      return false
    } else if (props.marking === 2) props.onNewMove(parseInt(e.target.id))
  }

  return (
    <div className="col" onClick={handleNewMove}>
      <div className={props.symbolsMap[props.marking][0]} id={props.id}>
        {String.fromCharCode(props.symbolsMap[props.marking][1])}
      </div>
    </div>
  )
}

export default Column
