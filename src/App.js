import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import parse from "html-react-parser";


class LambdaCall extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button
          onClick={this.handleClick("lorde-ipsum")}
          className="button"
        >
          {loading ? "Loading..." : "Generate Lorde Ipsum"}
        </button>
        {msg && parse(msg)}
      </p>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <LambdaCall />
        </header>
      </div>
    )
  }
}

export default App
