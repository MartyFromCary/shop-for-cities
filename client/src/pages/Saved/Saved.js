import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import "./Styles.css";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea } from "../../components/Form";

import API from "../../utils/API";

const Th = styled.th`
  border: 1px solid #dddddd;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
  &:hover {
    background-color: white;
    color: rgba(62,60, 67, .5);
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: white;
    color: rgba(62, 60, 67, .5);
  }
`;

const sygicTagList = {
  Airports: {
    tags: "Airport|Airport Terminal",
    title: "Airports"
  },
  ATMs: {
    tags: "ATM",
    title: "ATM"
  },
  Bakery: {
    tags: "Bakery",
    title: "Bakery"
  },
  Banks: {
    tags: "Bank",
    title: "Bank"
  },
  Bar: {
    tags: "Bar",
    title: "Bar"
  },
  BeautySalon: {
    tags: "Beauty Salon",
    title: "Beauty Salon"
  },
  BicycleShop: {
    tags: "Bicycle Shop",
    title: "Bicycle Shop"
  },
  Bookstore: {
    tags: "Bookshop",
    title: "Bookstore"
  },
  CarDealership: {
    tags: "Car Dealership",
    title: "Car Dealership"
  },
  CarParts: {
    tags: "Car Parts Shop",
    title: "Car Parts Shop"
  },
  CarRepair: {
    tags: "Car Repair",
    title: "Car Repair"
  },
  CarWash: {
    tags: "Car Wash",
    title: "Car Wash"
  },
  Clinics: {
    tags: "Clinic",
    title: "Clinics"
  },
  Coffee: {
    tags: "Coffee",
    title: "Coffee"
  },
  Community: {
    tags: "Community Centre",
    title: "Community Centers"
  },
  ConvenienceStore: {
    tags: "Convenience Store",
    title: "Convenience Store"
  },
  CopyShop: {
    tags: "Copy Shop",
    title: "Copy Shop"
  },
  CourtBuilding: {
    tags: "Court Building",
    title: "Court Building"
  },
  Dentists: {
    tags: "Dentist",
    title: "Dentists"
  },
  Doctors: {
    tags: "Doctor",
    title: "Doctor"
  },
  DryCleaning: {
    tags: "Dry Cleaning",
    title: "Dry Cleaning"
  },
  ElectronicsShop: {
    tags: "Electronics Shop",
    title: "Electronics Shop"
  },
  FireStation: {
    tags: "Fire Station",
    title: "Fire Station"
  },
  Fitness: {
    tags: "Fitness|Fitness Center",
    title: "Fitness"
  },
  GasStation: {
    tags: "Gas Station",
    title: "Gas Station"
  },
  Groceries: {
    tags: "Supermarket",
    title: "Supermarket"
  },
  Hairdresser: {
    tags: "Hairdresser",
    title: "Hairdresser"
  },
  Hardware: {
    tags: "Hardware",
    title: "Hardware"
  },
  Historical: {
    tags: "Historical",
    title: "Historical"
  },
  Hospitals: {
    tags: "Hospital",
    title: "Hospitals"
  },
  Hotel: {
    tags: "Hotel",
    title: "Hotel"
  },
  IceCream: {
    tags: "Ice Cream",
    title: "Ice Cream"
  },
  Library: {
    tags: "Library",
    title: "Library"
  },
  MotorcycleShop: {
    tags: "Motorcycle Shop",
    title: "Motorcycle Shop"
  },
  Museums: {
    tags: "Museum",
    title: "Museum"
  },
  Open247: {
    tags: "Open 24/7",
    title: "Open 24/7"
  },
  OutdoorEquip: {
    tags: "Outdoor Equipment Shop",
    title: "Outdoor Equipment Shop"
  },
  Park: {
    tags: "Park",
    title: "Park"
  },
  Parking: {
    tags: "Parking",
    title: "Parking"
  },
  Pawnbroker: {
    tags: "Pawnbroker",
    title: "Pawnbroker"
  },
  Pharmacy: {
    tags: "Pharmacy",
    title: "Pharmacy"
  },
  Pizza: {
    tags: "Pizza",
    title: "Pizza"
  },
  Playground: {
    tags: "Playground",
    title: "Playground"
  },
  PostOffice: {
    tags: "Post Office",
    title: "Post Office"
  },
  PublicTransport: {
    tags: "Public Transport",
    title: "Public Transport"
  },
  Restaurants: {
    tags: "Restaurant",
    title: "Restaurant"
  },
  SwimmingPool: {
    tags: "Swimming Pool|Swimming",
    title: "Swimming Pool"
  },
  Theaters: {
    tags: "Theater",
    title: "Movie Theaters"
  },
  TownHall: {
    tags: "Town Hall",
    title: "Town Hall"
  },
  TrainStation: {
    tags: "Train Station",
    title: "Train Station"
  },
  University: {
    tags: "University",
    title: "Universities"
  },
  WheelchairAccessible: {
    tags: "Wheelchair Accessible",
    title: "Wheelchair Accessible"
  },
  Worship: {
    tags: "Place of Worship",
    title: "Places of Worship"
  },
  Zoos: {
    tags: "Zoo",
    title: "Zoo"
  }
};

const radiusList = [
  5,
  10,
  15,
  50,
  100,
  150,
  200,
  500
];

class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      cities: [],
      city: {
        name: "",
        state: "",
        country: "",
        lat: "",
        long: "",
        notes: []
      },
      title: "",
      body: "",
      note: {
        _id: 0,
        title: "",
        body: ""
      },
      notes: [],
      category: "",
      radius: 5,
      catList: []
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleNote = event => {
    event.preventDefault();
    console.log(this.state);
    if (!this.state.city._id) {
      return;
    }
    if (this.state.note._id) {
      console.log("EDIT");
    } else {
      console.log("SAVE");
    }
    let Obj = {
      title: this
        .state
        .title
        .trim(),
      body: this
        .state
        .body
        .trim()
    };

    console.log(`title: ${Obj.title}`);
    console.log(`body: ${Obj.body}`);
  };

  submitNote = () => {

    if (!(this.state.city._id && this.state.title && this.state.body)) {
      return;
    }
    if (this.state.note._id) {
      console.log("EDIT");
    } else {
      console.log("SAVE");
    }
    let Obj = {
      _id: this.state.city._id,
      title: this.state.title,
      body: this.state.body
    };
    console.log(Obj);
    console.log(this.state);
    API
      .createNote(Obj)
      .then(res => {
        console.log(res.data);
        this.loadCity(this.state.city._id)
      })
      .catch(err => console.log(err));

  };

  componentDidMount = () => this.loadUser();

  onCategoryClick = category => this.setState({ category });
  onRadiusClick = radius => this.setState({ radius });

  onNoteDelete = _id => console.log(`note delete: ${_id}`);

  onDeleteClick = city => {
    alert("DELETE");
  };

  onNoteClick = note => { this.setState({ note: note }); console.log(this.state) };
  onCityClick = _id => this.loadCity(_id);

  searchWithParameters = () => {
    if (!this.state.city.lat) {
      return;
    }
    if (!this.state.category) {
      return;
    }

    if (sygicTagList[this.state.category]) {
      API
        .getByTags([
          sygicTagList[this.state.category].tags,
          this.state.city.lat,
          this.state.city.long,
          this.state.radius
        ])
        .then(({ data }) => {
          this.setState({ catList: data });
          console.log(this.state);
        })
        .catch(err => console.log(err));

      return;
    }

    switch (this.state.category) {
      case "Weather":
        API
          .getWeatherInfo({ lat: this.state.city.lat, long: this.state.city.long })
          .then(({ data }) => this.setState({ catList: [data] }))
          .catch(err => console.log(err));
        break;

      default:
        break;

    }
  };

  loadUser = () => API
    .getUser()
    .then(({ data }) => this.setState({ name: data.name, cities: data.cities }))
    .catch(err => console.log(err));

  loadCity = (_id) => {
    console.log("loadCity");
    API
      .getCity(_id)
      .then(({ data }) => {
        console.log(data);
        this.setState({ city: data });
        console.log(this.state)
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  renderWeather() {
    return (
      <div>
        <table className="hospital-table">
          <thead>
            <tr>
              <Th>Weather</Th>
              <Th>Temp (F)</Th>
              <Th>Humidty</Th>
              <Th>Pressure</Th>
            </tr>
          </thead>
          <tbody>
            {this
              .state
              .catList
              .map(cat => (
                <Tr key={cat.temp}>
                  <Td>{cat.main}</Td>
                  <Td style={{
                    textAlign: "right"
                  }}>{cat.temp}</Td>
                  <Td style={{
                    textAlign: "right"
                  }}>{cat.humidity}</Td>
                  <Td style={{
                    textAlign: "right"
                  }}>{cat.pressure}</Td>
                </Tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderByTags() {
    return (
      <div>
        <table className="hospital-table">
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Link</Th>
              <Th>Distance</Th>
            </tr>
          </thead>
          <tbody>
            {this
              .state
              .catList
              .map(cat => (
                <Tr key={cat.url}>
                  <Td>{cat.name}</Td>
                  <Td style={{
                    textAlign: "center"
                  }}>{cat.address}</Td>
                  <Td style={{
                    textAlign: "right"
                  }}>
                    <a href={cat.url} target="_blank">
                      Link
                    </a>
                  </Td>
                  <Td style={{
                    textAlign: "right"
                  }}>
                    {Math.floor(cat.distance * 100) / 100.0}
                  </Td>
                </Tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderCatList() {
    if (sygicTagList[this.state.category]) {
      return this.renderByTags();
    }

    switch (this.state.category) {
      case "Weather":
        return this.renderWeather();

      default:
        return <div />;
    }
  }

  render() {
    return (

      <div>
        <Row>
          <Link to="/search">
            <button className="search-cities-button">Search Cities</button>
          </Link>
        </Row>

        <Container fluid>

          <Row>
            <Col size="md-3 sm-6">
              {this.state.city.name ? <h3>Notes for {this.state.city.name}</h3>
                : <h3>Saved Notes</h3>
              }

              <div className="scroll">
                <table className="saved-cities">
                  <tbody>
                    {this.state.city.notes.map(note => (
                      <Tr key={note._id} onClick={() => this.onNoteClick(note)}>
                        <Td onClick={() => this.onDeleteClick(note._id)}>X</Td>
                        <Td>{note.title}</Td>
                        <Td>{note.createdAt}</Td>
                      </Tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>

            <Col size="md-3 sm-6">
              <h3>Saved Cities</h3>
              <div className="scroll">
                <table className="saved-cities">
                  <tbody>
                    {this
                      .state
                      .cities
                      .map(city => (
                        <Tr key={city._id} onClick={() => this.onCityClick(city._id)}>
                          <Td onClick={() => this.onDeleteClick(city)}>X</Td>
                          <Td>{city.name}</Td>
                          <Td
                            style={{
                              textAlign: "center"
                            }}>{city.state}</Td>
                          <Td
                            style={{
                              textAlign: "center"
                            }}>{city.country}</Td>
                        </Tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Col>

            <Col size="md-2 sm-4">
              <h3>Category</h3>
              <div className="scroll">
                <table className="saved-cities">
                  <tbody>
                    <Tr onClick={() => this.onCategoryClick("Weather")}>
                      <Td>Weather</Td>
                    </Tr>
                    {Object
                      .keys(sygicTagList)
                      .map(category => (
                        <Tr key={category} onClick={() => this.onCategoryClick(category)}>
                          <Td>{sygicTagList[category].title}</Td>
                        </Tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Col>

            <Col size="md-1 sm-2">
              <h3>Radius</h3>
              <div className="scroll">
                <table className="saved-cities">
                  <tbody>
                    {radiusList.map(radius => (
                      <Tr key={radius} onClick={() => this.onRadiusClick(radius)}>
                        <Td>{radius}
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>

          </Row>

          <Row>
            <Col size="md-3 sm-6" />

            <Col size="md-3 sm-6">
              <h3>Selected Parameters</h3>
              <table className="saved-cities">
                <thead>
                  <tr>
                    <Th>City</Th>
                    <Th>Lat</Th>
                    <Th>Long</Th>
                    <Th>Category</Th>
                    <Th>Radius</Th>
                  </tr>
                </thead>
                <tbody>
                  <Tr>
                    <Td>{this.state.city.name}</Td>
                    <Td>{this.state.city.lat}</Td>
                    <Td>{this.state.city.long}</Td>
                    <Td>{this.state.category}</Td>
                    <Td>{this.state.radius}</Td>
                  </Tr>
                </tbody>
              </table>
              <br />
              <button onClick={this.searchWithParameters}>Search with Parameters</button>
            </Col>

          </Row>
          <Row>

            <Col size="md-3 sm-6">

              <h3>Saved Notes</h3>
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title" />
                <TextArea
                  value={this.state.body}
                  onChange={this.handleInputChange}
                  name="body"
                  placeholder="Body" />
              </form>
              <button onClick={this.submitNote}>Add/Edit Note</button>

              {this.state.city.notes.length
                ? (
                  <div>
                    <h3>Saved Notes</h3>
                    <table>
                      <thead>
                        <tr>
                          <Th>DELETE</Th>
                          <Th>Title</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {this
                          .state
                          .city
                          .notes
                          .map(note => (
                            <Tr key={note._id} onClick={() => this.onNoteClick(note._id)}>
                              <Td onClick={() => this.onNoteDelete(note._id)}>X</Td>
                              <Td>{note.title}</Td>
                            </Tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )
                : (
                  <h3>No Saved Notes</h3>
                )}
            </Col>

            <Col size="md-2 sm-1"></Col>

            <Col size="md-3 sm-6">
              <h3 className="category-title">{this.state.catList.length}
                Results</h3>
              <div className="scroll-div">
                {this.state.catList.length
                  ? (this.renderCatList())
                  : (
                    <h3>No Results</h3>
                  )}
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Saved;
