import React, { Component } from "react";
import styled from "styled-components";

import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";

import API from "../../utils/API";

const Th = styled.th`
  border: 1px solid #dddddd;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
  &:hover {
    background-color: yellow;
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: yellow;
  }
`;

class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {cities: []},
XX: [],
      id: 0,
      name: "",
      state: "",
      country: "",
      lat: 0.0,
      long: 0.0
    };
    //this.loadUser();
  }

  componentWillMount() {
    this.loadUser();
  }

  onRowClick = city => {
    this.setState({
      id: city.id,
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      long: city.long
    });
  };

  onDeleteClick = city => {alert("DELETE");
   /* 
    API.createSaved(city)
      .then(res => console.log(res.data.name))
      .catch(err => console.log(err));
    this.loadUser();*/
  };

  loadUser = () => {
    API.getUser()
      .then(({ data: user }) => {
        this.setState({
          user
        });
        //console.log(this.state.user.cities);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSearch = event => {
    event.preventDefault();

    API.searchCities({
      name: this.state.name.trim(),
      state: this.state.state.trim(),
      country: this.state.country.trim()
    })
      .then(res => this.setState({ cities: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.user);
    console.log(this.state.user.cities);
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Saved Cities</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="City Name (required)"
              />
              <Input
                value={this.state.state}
                onChange={this.handleInputChange}
                name="state"
                placeholder="State/Province (optional)"
              />
              <Input
                value={this.state.country}
                onChange={this.handleInputChange}
                name="country"
                placeholder="Country (optional)"
              />
              
            </form>
          </Col>
        </Row>

        <Row>
          <Col size="md-6 sm-12">
            {this.state.user.cities.length ? (
              <table>
                <thead>
                  <tr>
                    <Th>DELETE</Th>
                    <Th>Name</Th>
                    <Th>State</Th>
                    <Th>Country</Th>
                    <Th>Population</Th>
                    <Th>Lat</Th>
                    <Th>Long</Th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.user.cities.map(city => (
                    <Tr
                      key={city.id}
                      data_id={city.id}
                      onClick={() => this.onRowClick(city)}
                    >
                      <Td onClick={() => this.onDeleteClick(city)}>X</Td>
                      <Td>{city.name}</Td>
                      <Td style={{ textAlign: "center" }}>{city.state}</Td>
                      <Td style={{ textAlign: "center" }}>{city.country}</Td>
                      <Td style={{ textAlign: "right" }}>{city.population}</Td>
                      <Td style={{ textAlign: "right" }}>{city.lat}</Td>
                      <Td style={{ textAlign: "right" }}>{city.long}</Td>
                    </Tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3>No Saved Cities Found</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
