import React, {useState, useContext, Component} from "react";
import "./styles.css";
import {UserContext} from "./UserContext.js";
import {Redirect} from "react-router-dom";
import axios from "./axios.js";

const logoStyle = {
    fontSize: 200
  };
const logoStyleSmall = {
    fontSize: 100
  };


class Login extends Component {
    constructor(props) {
        super(props);
        this.newuser = {username: '', password: ''};
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
    }

    static contextType = UserContext;

    async tryLogin(context) {
        const info =   {
            username: this.newuser.username,
            password: this.newuser.password
        };
        const { data } = await axios.post("/users", { user: info });

        console.log(data);
        if(data.user == 0) {
            return;
        }
        const [user, setUser] = context;
        setUser([{username: data.user.username}]);
        this.setState(() => ({toHomepage: true}))
    }

    handleUsername(event) {
        this.newuser.username = event.target.value;
        console.log(this.newuser);
    }

    handlePassword(event) {
        this.newuser.password = event.target.value;
    }
      
    state = {
        toHomepage: false,
    }


    render() {
        const [user, setUser] = this.context;
        if (this.state.toHomepage === true) {
          return <Redirect to='/' />
        }
        return (
            <div className="login">
                <div className="row">
                    <div className="col s12 center-align">
                        <i className="material-icons white-text hide-on-small-and-down" style={logoStyle}>
                            person
                        </i>
                        <i className="material-icons white-text hide-on-med-and-up" style={logoStyleSmall} >
                            person
                        </i>
                    </div>
                </div>
                <div className="row">
                    <div className="col card s10 offset-s1 m6 offset-m3 center-align">
                        <h6>Login</h6>
                        <div className="row">
                            <form className="col s12" onChange={this.handleUsername}>
                                <div className="row">
                                    <div className="input-field col s12">
                                    <input id="username" type="text" className="validate"/>
                                    <label for="username" className="active">Username</label>
                                    </div>
                                </div>
                            </form>
                            <form className="col s12" onChange={this.handlePassword}>
                                <div className="row">
                                    <div className="input-field col s12">
                                    <input id="password" type="password" className="validate"/>
                                    <label for="password" className="active">Password</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="container section center-align">
                            <div 
                            className="btn waves-effect waves-light blue darken-4"
                            onClick={() => this.tryLogin(this.context)}>
                                login
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
