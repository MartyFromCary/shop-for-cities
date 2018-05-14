import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import "./Styles.css";
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
  Airports: { tags: "Airport|Airport Terminal", title: "Airports" },
  ATMs: { tags: "ATM", title: "ATM" },
  Bakery: { tags: "Bakery", title: "Bakery" },
  Banks: { tags: "Bank", title: "Bank" },
  Bar: { tags: "Bar", title: "Bar" },
  BeautySalon: { tags: "Beauty Salon", title: "Beauty Salon" },
  BicycleShop: { tags: "Bicycle Shop", title: "Bicycle Shop" },
  Bookstore: { tags: "Bookshop", title: "Bookstore" },
  CarDealership: { tags: "Car Dealership", title: "Car Dealership" },
  CarParts: { tags: "Car Parts Shop", title: "Car Parts Shop" },
  CarRepair: { tags: "Car Repair", title: "Car Repair" },
  CarWash: { tags: "Car Wash", title: "Car Wash" },
  Clinics: { tags: "Clinic", title: "Clinics" },
  Coffee: { tags: "Coffee", title: "Coffee" },
  Community: { tags: "Community Centre", title: "Community Centers" },
  ConvenienceStore: { tags: "Convenience Store", title: "Convenience Store" },
  CopyShop: { tags: "Copy Shop", title: "Copy Shop" },
  CourtBuilding: { tags: "Court Building", title: "Court Building" },
  Dentists: { tags: "Dentist", title: "Dentists" },
  Doctors: { tags: "Doctor", title: "Doctor" },
  DryCleaning: { tags: "Dry Cleaning", title: "Dry Cleaning" },
  ElectronicsShop: { tags: "Electronics Shop", title: "Electronics Shop" },
  FireStation: { tags: "Fire Station", title: "Fire Station" },
  Fitness: { tags: "Fitness|Fitness Center", title: "Fitness" },
  GasStation: { tags: "Gas Station", title: "Gas Station" },
  Groceries: { tags: "Supermarket", title: "Supermarket" },
  Hairdresser: { tags: "Hairdresser", title: "Hairdresser" },
  Hardware: { tags: "Hardware", title: "Hardware" },
  Historical: { tags: "Historical", title: "Historical" },
  Hospitals: { tags: "Hospital", title: "Hospitals" },
  Hotel: { tags: "Hotel", title: "Hotel" },
  IceCream: { tags: "Ice Cream", title: "Ice Cream" },
  Library: { tags: "Library", title: "Library" },
  MotorcycleShop: { tags: "Motorcycle Shop", title: "Motorcycle Shop" },
  Museums: { tags: "Museum", title: "Museum" },
  Open247: { tags: "Open 24/7", title: "Open 24/7" },
  OutdoorEquip: { tags: "Outdoor Equipment Shop", title: "Outdoor Equipment Shop" },
  Park: { tags: "Park", title: "Park" },
  Parking: { tags: "Parking", title: "Parking" },
  Pawnbroker: { tags: "Pawnbroker", title: "Pawnbroker" },
  Pharmacy: { tags: "Pharmacy", title: "Pharmacy" },
  Pizza: { tags: "Pizza", title: "Pizza" },
  Playground: { tags: "Playground", title: "Playground" },
  PostOffice: { tags: "Post Office", title: "Post Office" },
  PublicTransport: { tags: "Public Transport", title: "Public Transport" },
  Restaurants: { tags: "Restaurant", title: "Restaurant" },
  SwimmingPool: { tags: "Swimming Pool|Swimming", title: "Swimming Pool" },
  Theaters: { tags: "Theater", title: "Movie Theaters" },
  TownHall: { tags: "Town Hall", title: "Town Hall" },
  TrainStation: { tags: "Train Station", title: "Train Station" },
  University: { tags: "University", title: "Universities" },
  WheelchairAccessible: { tags: "Wheelchair Accessible", title: "Wheelchair Accessible" },
  Worship: { tags: "Place of Worship", title: "Places of Worship" },
  Zoos: { tags: "Zoo", title: "Zoo" },
};

class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      cities: [],
      city: { name: "None Selected", state: "", country: "", lat: "", long: "", notes: [] },
      title: "",
      body: "",
      note: { _id: 0, title: "", body: "" },
      category: "",
      radius: 5,
      catList: []
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleNote = event => {
    event.preventDefault();
    console.log(this.state);
    if (!this.state.city._id) { return; }
    if (this.state.note._id) {
      console.log("EDIT");
    } else { console.log("SAVE"); }
    let Obj = {
      title: this.state.title.trim(),
      body: this.state.body.trim()
    };

    console.log(`title: ${Obj.title}`);
    console.log(`body: ${Obj.body}`);
  };

  componentDidMount = () => this.loadUser();

  onCityClick = _id =>
    API.getCity(_id)
      .then(({ data }) => {
        console.log(data);
        this.setState({ city: data });
        console.log(this.state)
      })
      .catch(err => console.log(err));

  onCategoryClick = category => {
    if (!this.state.city.lat) { return; }

    if (sygicTagList[category]) {
      API.getByTags([
        sygicTagList[category].tags,
        this.state.city.lat,
        this.state.city.long,
        this.state.radius
      ])
        .then(({ data }) => {
          this.setState({ category, catList: data });
          console.log(this.state);
        })
        .catch(err => console.log(err));

      return;
    }

    switch (category) {
      case "Weather":
        API.getWeatherInfo({
          lat: this.state.city.lat,
          long: this.state.city.long
        })
          .then(({ data }) => this.setState({ category, catList: [data] }))
          .catch(err => console.log(err));
        break;

      default: break;

    }

  }

  onNoteClick = _id => console.log(`note click: ${_id}`);
  onNoteDelete = _id => console.log(`note delete: ${_id}`);

  onDeleteClick = city => {
    alert("DELETE");
  };

  loadUser = () =>
    API.getUser()
      .then(({ data }) => this.setState({ name: data.name, cities: data.cities }))
      .catch(err => console.log(err));

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
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
            {this.state.catList.map(cat => (
              <Tr key={cat.temp}>
                <Td>{cat.main}</Td>
                <Td style={{ textAlign: "right" }}>{cat.temp}</Td>
                <Td style={{ textAlign: "right" }}>{cat.humidity}</Td>
                <Td style={{ textAlign: "right" }}>{cat.pressure}</Td>
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
            {this.state.catList.map(cat => (
              <Tr key={cat.url}>
                <Td>{cat.name}</Td>
                <Td style={{ textAlign: "center" }}>{cat.address}</Td>
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
      <Container fluid>
        <Row>
          <Link to="/search">
            <button className="search-cities-button">Search Cities</button>
          </Link>
        </Row>

        <Row>
          <Col size="md-3 sm-6">
            <h3>Selected City:</h3>
            <table className="saved-cities">
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>State</Th>
                  <Th>Country</Th>
                  <Th>Lat</Th>
                  <Th>Long</Th>
                </tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>{this.state.city.name}</Td>
                  <Td style={{ textAlign: "center" }}>{this.state.city.state}</Td>
                  <Td style={{ textAlign: "center" }}>{this.state.city.country}</Td>
                  <Td style={{ textAlign: "right" }}>{this.state.city.lat}</Td>
                  <Td style={{ textAlign: "right" }}>{this.state.city.long}</Td>
                </Tr>
              </tbody>
            </table>
          </Col>

          <Col size="md-2 sm-1"> </Col>


          <Col size="md-3 sm-6">
            <div>
              <div className="selected-city">
                <h3>Categories:</h3>
                <form>
                  <label>
                    Radius:
                    <select
                      value={this.state.radius}
                      name="radius"
                      onChange={this.handleInputChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </label>

                  <div className="scroll">
                    <table className="saved-cities">
                      <thead>
                        <tr>
                          <Th>Category</Th>
                        </tr>
                      </thead>
                      <tbody>
                        <Tr onClick={() => this.onCategoryClick("Weather")}>
                          <Td>Weather</Td>
                        </Tr>

                        {Object.keys(sygicTagList).map(category => (
                          <Tr
                            key={category}
                            onClick={() => this.onCategoryClick(category)}
                          >
                            <Td>{sygicTagList[category].title}</Td>
                          </Tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>

            </div>
          </Col>
        </Row>

        <Row>
          <Col size="md-3 sm-6">
            {this.state.cities.length ? (
              <div>
                <h3>Saved Cities</h3>
                <div className="scroll">
                  <table className="saved-cities">
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
                      {this.state.cities.map(city => (
                        <Tr
                          key={city._id}
                          onClick={() => this.onCityClick(city._id)}
                        >
                          <Td onClick={() => this.onDeleteClick(city)}>X</Td>
                          <Td>{city.name}</Td>
                          <Td style={{ textAlign: "center" }}>{city.state}</Td>
                          <Td style={{ textAlign: "center" }}>{city.country}</Td>
                          <Td style={{ textAlign: "right" }}>
                            {city.population}
                          </Td>
                        </Tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
                <h3>No Saved Cities Found</h3>
              )}
            <br />
            <h3> Saved Notes</h3>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.body}
                onChange={this.handleInputChange}
                name="body"
                placeholder="Body (required)"
              />
              <FormBtn
                disabled={!(this.state.city._id && this.state.title && this.state.body)}
                onClick={this.handleNote}
              >
                Add/Edit Note
              </FormBtn>
            </form>
            {this.state.city.notes.length ? (
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
                    {this.state.city.notes.map(note => (
                      <Tr
                        key={note._id}
                        onClick={() => this.onNoteClick(note._id)}
                      >
                        <Td onClick={() => this.onNoteDelete(note._id)}>X</Td>
                        <Td>{note.title}</Td>
                      </Tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
                <h3>No Saved Notes</h3>
              )}
          </Col>

          <Col size="md-2 sm-1"> </Col>

          <Col size="md-3 sm-6">
            <h3 className="category-title">{this.state.category}</h3>
            <div className="scroll-div">

              {/*Anna changed line 495 */}
              {this.state.catList.length ? (
                this.renderCatList()
              ) : (
                  <h3>No Results</h3>
                )}
            </div>
          </Col>

        </Row>
      </Container>
    );
  }
}

export default Saved;
