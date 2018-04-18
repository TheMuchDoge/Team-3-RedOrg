import React from "react";
import { NavLink } from "react-router-dom";
import { eventQueries, queries } from "./services";
import {Button, Glyphicon, Grid, Row, Col, Table} from "react-bootstrap"

class Kalender extends React.Component {
  constructor(props) {
    super(props);

    this.events = [];
  }

  render() {
    let eventList = [];
    for (let i of this.events) {
      eventList.push(
          <tr key={i.eventID} >
              <td><NavLink activeStyle={{ color: "green" }} to={"/event/" + i.eventID}>
                  <h3>{i.eventNavn}</h3>
              </NavLink></td>
              <td style={{paddingTop: 30+"px"}}><b>Lokasjon: </b> {i.eventDatoStart}</td>
          </tr>
      );
    }

    return (
      <div className="Content" id="Kalender">
          <Grid>
              <Row>
                  <Col xs={8}>
                      <h1>Kalender: </h1>
                  </Col>
                  <Col xs={4}>
                  <NavLink  to={"/createEvent/"}>
                     <Button><Glyphicon glyph="plus"/> event</Button>
                  </NavLink>{" "}
                  </Col>

              </Row>
              <Row>
                  <Table striped hover>
                      <tbody>
                            {eventList}
                      </tbody>
                  </Table>
              </Row>
          </Grid>
      </div>
    );
  }

  componentDidMount() {
    eventQueries.hentEvents().then((results) => {
      this.events = results;
      this.forceUpdate();
    });

  }
}

export default Kalender;
