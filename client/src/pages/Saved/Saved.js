import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Styles from "./Styles.css";
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
      user: { cities: [] },
      city: {},
      category: "",
      catList: []
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  onRowClick = city => {
    this.setState({ city });
  };

  onCatClick = category => {
    this.setState({ category });
    alert(`${category}: ${this.state.city.lat},${this.state.city.long}`);

    switch (this.state.category) {
      case "Restaurants":
        console.log("HERE");
        API.restaurants(this.state.city.lat, this.state.city.long)
          .then(({ data }) => {
            this.setState({
              catList: data
            });
            console.log(this.state.catList);
          })
          .catch(err => console.log(err));
        break;
      default:
        break;
    }
  };

  onDeleteClick = city => {
    alert("DELETE");
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
    return (
      <Container fluid>
        <Row>
          <Jumbotron className="text-center">
            {this.state.city.name ? (
              <div>
                <table>
                  <tbody>
                    <tr>
                      <Td onClick={() => this.onCatClick("Restaurants")}>
                        Restaurants
                      </Td>
                      <Td onClick={() => this.onCatClick("Sports")}>Sports</Td>
                      <Td onClick={() => this.onCatClick("Hospitals")}>
                        Hospitals
                      </Td>
                    </tr>
                  </tbody>
                </table>

                <div>
                  <h2>Selected City:</h2>
                  <br />
                  <h3>
                    {this.state.city.name}, {this.state.city.state}
                  </h3>
                  <h3>{this.state.city.country}</h3>
                  <h3>
                    {this.state.city.lat},{this.state.city.long}
                  </h3>
                </div>
              </div>
            ) : (
              <h1>{this.state.user.name}'s Saved Cities</h1>
            )}
          </Jumbotron>

          <Link to="/search">
            <button>Search Cities</button>
          </Link>
        </Row>

        <Row>
          <Col size="md-3 sm-6">
            {this.state.user.cities.length ? (
              <table>
                <thead>
                  <tr>
                    <Th>DELETE</Th>
                    <Th>Name</Th>
                    <Th>State</Th>
                    <Th>Country</Th>
                    <Th>Population</Th>
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
                    </Tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3>No Saved Cities Found</h3>
            )}
          </Col>

          <Col size="md-2 sm-1"> </Col>
          <Col size="md-3 sm-6">
            {this.state.catList.length ? (
              <table>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Address</Th>
                    <Th>Cuisine</Th>
                    <Th>Cost for 2</Th>
                    <Th>Rating</Th>
                    <Th>Link</Th>
                    <Th>Distance</Th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.catList.map(cat => (
                    <Tr key={cat.url}>
                      <Td>{cat.name}</Td>
                      <Td style={{ textAlign: "center" }}>{cat.address}</Td>
                      <Td style={{ textAlign: "center" }}>{cat.cuisine}</Td>
                      <Td style={{ textAlign: "right" }}>${cat.cost_for_2}</Td>
                      <Td style={{ textAlign: "right" }}>{cat.rating}</Td>
                      <Td style={{ textAlign: "right" }}>
                        <a href={cat.url} target="_blank">
                          Link
                        </a>
                      </Td>
                      <Td style={{ textAlign: "right" }}>
                        {Math.floor(cat.distance * 100) / 100.0}
                      </Td>
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
