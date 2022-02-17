import React from "react"
import Column from "./Column"

const Row = (props) => {
  const { row, boardState, symbolsMap, onNewMove, active } = props

  const cols = []
  for (const i = 0; i < 4; i++) {
    const id = row * 4 + i
    const marking = boardState[id]
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
