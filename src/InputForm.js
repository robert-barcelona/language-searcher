import React, {useState, useEffect} from 'react'

import {css, jsx} from '@emotion/core'

import {getWordData} from './logic'
import {languageTypes} from './languages'

import Detail from './Detail'

const InputForm = props => {

  const [data, setData] = useState([])
  const [word, setWord] = useState('')
  const [searchedWord, setSearchedWord] = useState('')
  const [mappedLanguages, setMappedLanguages] = useState([])
  const [language, setLanguage] = useState('en')
  const [loading, setLoading] = useState(false)
  const [detailWord, setDetailWord] = useState(null)

  useEffect(() => {
    const types = Object.entries(languageTypes)
    const mappedTypes = types.map(typePair => <option key={typePair[0]} value={typePair[0]}>{typePair[1]}</option>)
    setMappedLanguages(mappedTypes)
  }, [])



  const doShowDetail = detailWord => {
    setDetailWord(detailWord)
  }

  const wordChange = e => {
    setWord(e.target.value)

  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (word === '') return
    setLoading(true)
    setSearchedWord('')
    setDetailWord(null)
    try {
      const results = await getWordData(word, language)
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
            <h1 className="title" css={css`
      background-color: lightblue;
      font-size: 24px;
      padding:20px;
      border-radius: 14px;
    `}>
              Search for semantically similar words
            </h1>

          </div>
        </div>
      </section>
      <div className="columns " css={css`
      background-color: rgba(100,100,0,0.5);
      padding:20px;
      border-radius: 14px;
      border: solid 1px grey;
      
    `}>
        <section className="column" >
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Word to search for:</label>
              <div className="control">
                <input className="input" value={word} onChange={wordChange} type="text" placeholder="Word to search for..."/>
              </div>
            </div>
            <div className="field">
              <label className="label">Language:</label>
              <div className="select">
                <select value={language} onChange={e => setLanguage(e.target.value)}>
                  {mappedLanguages}
                </select>
              </div>
            </div>
           { word && <div className="field">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
            </div>}
          </form>
          <div className="container">
            { loading && "Loading results..."}
            { !loading && data && (data.length !== 0) &&
            <div><h2>Semantically similar words for "{searchedWord}"</h2>
              < div className="list is-hoverable">

                {data.length !== 0 && data.map((word, index) => <a onClick={e => doShowDetail(word)}
                                                                   className="list-item"
                                                                   key={index}>{word.word}</a>)}
              </div>
            </div>}
          </div>
        </section>
        <section className="column">
          {(detailWord !== null) && <Detail word={detailWord}/>}
        </section>
      </div>
    </div>

  )


}

export default InputForm
