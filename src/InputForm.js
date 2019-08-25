import React, {useState, useEffect} from 'react'

import axios from 'axios'

import Detail from './Detail'

const InputForm = props => {

  const [data, setData] = useState([])
  const [word, setWord] = useState('dog')
  const [searchedWord, setSearchedWord] = useState('')
  const [language, setLanguage] = useState('en')
  const [loading, setLoading] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [detailWord, setDetailWord] = useState('')

  const getWordData = async () => {
    const queryURL = `https://api.gavagai.se/v3/lexicon/${language}/${word}?apiKey=3acdef1f01cbceb88b132158abd466da&additionalFields=SEMANTICALLY_SIMILAR_WORDS`
    try {
      const results = await axios.get(queryURL)
      console.log(results)
      return results.data.semanticallySimilarWords
    } catch (error) {
      console.log(error)
    }
  }

  const close = e => {
    setShowDetail(false)
    setDetailWord('')
  }

  const doShowDetail = word => {
    console.log('do show detail',word)
    setShowDetail(true)
    setDetailWord(word)

  }

  const wordChange = e => {
    setWord(e.target.value)

  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSearchedWord('')
    try {
      const results = await getWordData()
      setLoading(false)
      setData(results)
      setSearchedWord(word)
    } catch (e) {
      console.log(e)
    }
  }

  return (

    <div className="container">
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Search for semantically similar words
            </h1>

          </div>
        </div>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label className="label">Word to search for:</label>
            <div className="control">
              <input className="input" value={word} onChange={wordChange} type="text" placeholder="Text input"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
        <div className="container">
          {!showDetail && loading && "Loading results..."}
          {!showDetail && !loading && data.length !== 0 && <div><h2>Semantically similar words for "{searchedWord}"</h2>
            < div className="list is-hoverable">

              {data.length !== 0 && data.map((word, index) => <a onClick={e => doShowDetail(word)} className="list-item"
                                                                 key={index}>{word.word}</a>)}
            </div>
          </div>}
        </div>
      </section>
      {showDetail && <Detail close={close} word={detailWord}/>}
    </div>

  )


}

export default InputForm
