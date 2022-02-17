import React from "react"
import Column from "./Column"

const Row = (props) => {
  const { row, boardState, symbolsMap, onNewMove, active } = props

  const cols = []
  for (var i = 0; i < 4; i++) {
    var id = row * 4 + i
    var marking = boardState[id]
    cols.push(
      <Column
        key={id + "-" + marking}
        id={id + "-" + marking}
        symbolsMap={symbolsMap}
        marking={marking}
        onNewMove={onNewMove}
        active={active}
      />
    )
  }
  return <div className="row">{cols}</div>
}

export default Row
