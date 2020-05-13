import React, { Component } from "react";
import "../App.css"; 
import AuthManager from "../utils/AuthManager";
import Nav from "../components/Nav";
import Axios from "axios";
import API from "../utils/API";

class Home extends Component {

  state = {
    isAuthenticated: AuthManager.isAuthenticated()
  };

  handleLogOut = () => {
    AuthManager.logOut();
    this.setState({isAuthenticated: false});
  }

  componentDidMount = () => {
    API.getToken()
      .then(res => {
        console.log("testing:", res.data);
        // this.setState({ images: res.data });
      })
      .catch((error) =>{
        console.log("error", error);
      });
    }
  

  render() {
    return (
      <div>
        <Nav />
        {
          this.state.isAuthenticated ? (
            <button className="button button-blue" onClick={this.handleLogOut}>
            LOGOUT
            </button>
          ) : (
            <a className="button button-blue" href={process.env.REACT_APP_PROD_URL_LOGIN || "http://localhost:5000/auth/google/"}>
            LOGIN
            </a>
          )
        
        }
      </div>
    );
  }
}

export default Home;