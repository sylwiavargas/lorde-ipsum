import React, { Component } from "react"
import "./App.css"
// import parse from "html-react-parser";


class LambdaCall extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true })
    fetch("/.netlify/functions/lorde-ipsum")
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

    return (
      <>
        <p>
          <button
            onClick={this.handleClick("lorde-ipsum")}
            className="button"
          >
            {loading ? "Loading..." : "Generate Lorde Ipsum"}
          </button>
          {msg}
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
