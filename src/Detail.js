import React from 'react'

const Detail = props => {

console.log(props)
  return <section>
    <h1>Detail about "{props.word.word}"</h1>
    <h2>Is related to "{props.word.forWord}"</h2>
    <h2>Strength: {props.word.strength}</h2>
  </section>


}

export default Detail
