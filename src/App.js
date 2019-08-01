import React, { Component } from "react"
import "./App.css"
import parse from "html-react-parser";


class LambdaCall extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(res => {
        console.log(res);
        return res.json();
        })
      .then(data => {
        console.log(data);
        this.setState({ loading: false, msg: data.msg })})
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }

  render() {
    const { loading, msg } = this.state
    console.log(this.state)

    return (
      <>
        <p className="paragraph">
          <button
            onClick={this.handleClick("lorde-ipsum")}
            className="button"
          >
            {loading ? "Loading..." : "Generate Lorde Ipsum"}
          </button>
          {msg && parse(msg)}
        </p>
      </>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1> Lorde Ipsum </h1>
          <LambdaCall />
        </header>
      </div>
    )
  }
}

export default App
