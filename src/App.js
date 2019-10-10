import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      phrase: '',
      phraseTranslated: 'This is where your translated sentence will appear.'
    }
  }
  prefixForWord = (word) => {
    if (word[0] === 'q') {
      return 'q'
    }
    const wordPart = word.split('').reduce((prefix, currentLetter) => {
      if (['a', 'e', 'i', 'o', 'u'].indexOf(prefix[prefix.length - 1]) <= 0) {
        prefix.push(currentLetter)
      }
      return prefix
    },[])
    wordPart.pop()
    return wordPart.join("")
  }
  // The translate function is where you will put your logic to convert the sentence entered by the user to pig location.  What is currently in the function will only directly copy what the user has entered.
  wordSplitter = (word) => {
    const prefix = this.prefixForWord(word)
    if (prefix === '') {
      return [null, word]
    } else if (prefix === 'qu'){
      return["qu", word.slice(2)]
    } else {
      return [prefix,word.slice(prefix.length)]
    }
  }
  suffixPicker = (prefix) => {
    if (prefix === null) {
      return "way"
    } else if (prefix === "qu") {
      return "quay"
    } else {
      return prefix + "ay"
    }
  }
  translate = (e) => {
    e.preventDefault()
    let translated = this.state.phrase

		//magic happens
    const wordParts = this.wordSplitter(translated)

		const prefix = wordParts[0]
    const wordRoot = wordParts[1]

    const suffix = this.suffixPicker(prefix)
    const newTrans = wordRoot + suffix
    this.setState({phraseTranslated: newTrans})
  }

  handleChange = (e) => {
    this.setState({phrase: e.target.value})
  }

  render() {
    return (

      <div className="wrapper">
        <header className="box header">
          <div id="pigImage">
            <img src='https://lh3.googleusercontent.com/QvvsRY5ShwDNEouVMK8_z7QCwS3grkgd4mzZOlom23Hurralk54ObvsyEMM8ZSNR5pEFBeBMzltzEEcgi2llYJnhXTuXClN3njmMjtw3vgn8Go5jr40fHMNzfI64eYRrnHbZUutxCA=w2400' alt="pig with butcher cut names in pig latin" id="butcherPig"></img>
          </div>
        </header>
        <sidebar className="box sidebar">
          <div>
            <form className="info" onSubmit={this.translate}>
              <label htmlFor="input-phrase">Translate this: </label>
              <input name="input-phrase" onChange={this.handleChange}></input>
              <input className="button" type="submit" value="Submit" />
            </form>
          </div>
        </sidebar>
        <main>
          <div className="text-center box content">
            <p>{this.state.phraseTranslated}</p>
          </div>
        </main>
        <footer className="box footer">
          <div className="text-center">
            <p>Coded by * * *</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
