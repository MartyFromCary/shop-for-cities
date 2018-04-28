import React, { Component } from "react";
//import { Link } from "react-router-dom";

import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Login extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };
 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSignUp = event => {
    event.preventDefault();

    API.saveUser({
      name: this.state.name.trim(),
      email: this.state.email.trim().toLowerCase(),
      password: this.state.password.trim()
    })
      .then(res => {
        if (res.status === 200) {
          //alert("User successfully created");
          console.log(res.data);
          window.location.replace("/search");
        } else {
          alert("DB failed");
          console.log(res);
        }
      })
      .catch(err => {
        alert("DB failed");
        console.log(err);
      });
  };

  handleFormLogin = event => {
    event.preventDefault();

    API.loginUser({
      email: this.state.email.trim().toLowerCase(),
      password: this.state.password.trim()
    })
      //.then(res => console.log(res.data))
      .then(href => {
        console.log("href:");
        console.log(href);
        window.location.replace("/search");
      })
      .catch(err => console.log(err));
    // .fail(err => alert(`Error: ${err.responseText}`));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Login or Sign Up</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="User Name (for Sign Up only)"
              />
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
              <Input
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password (required)"
              />
              <FormBtn
                disabled={
                  !(this.state.name && this.state.email && this.state.password)
                }
                onClick={this.handleFormSignUp}
              >
                Sign Up
              </FormBtn>
              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormLogin}
              >
                Login
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
