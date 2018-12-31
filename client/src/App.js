import React, { Component } from "react";
import "./css/pure-min.css";
import "./css/side-menu.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listaAutor: [],
      name: '',
      email: '', 
      password: '',
    };
  }
  getAutores = () => {
    const requestInfo = {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    };
    fetch("http://cdc-react.herokuapp.com/api/autores", requestInfo)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          listaAutor: resJson
        });
      });
  };
  
  componentDidMount() {
    this.getAutores();
  }

  enviaForm = (event) => {
    console.log('fui clicado');
    event.preventDefault();

    const autor = {
      name: this.state.name, 
      email: this.state.email, 
      password: this.state.password
    }

     const requestInfo = {
      method: 'post',
      body: JSON.stringify(autor),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(requestInfo);
    fetch('http://cdc-react.herokuapp.com/api/autores', requestInfo)
    .then(res => res.json())
    .then(resJson => {
     console.log(resJson);
    });
  }

  setName = event => {
    this.setState({
      name: event.target.value
    })
  }

  setEmail = event => {
    this.setState({
      email: event.target.value
    })
  }

  setPassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span />
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">
              Company
            </a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Home
                </a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Autor
                </a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Livro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                <div className="pure-control-group">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" name="nome" value={this.state.name} onChange={this.setName}/>
                </div>
                <div className="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                </div>
                <div className="pure-control-group">
                  <label htmlFor="password">Senha</label>
                  <input id="password" type="password" name="password" value={this.state.password} onChange={this.setPassword}/>
                </div>
                <div className="pure-control-group">
                  <label />
                  <button
                    type="submit"
                    className="pure-button pure-button-primary"
                  >
                    Gravar
                  </button>
                </div>
              </form>
            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.listaAutor.map(autor => {
                    return (
                      <tr key={autor.id}>
                        <td>{autor.nome}</td>
                        <td>{autor.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
