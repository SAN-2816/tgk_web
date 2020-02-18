import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core/";

import Service from "../Components/Agree/Service";
import Personal from "../Components/Agree/Personal";
import Marketing from "../Components/Agree/Marketing";
class Agree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.match.params.index
    };
  }
  setPages() {
    const index = this.state.index;
    if (index === "0") {
      return <Service />;
    } else if (index === "1") {
      return <Personal />;
    } else if (index === "2") {
      return <Marketing />;
    } else {
      return <div>error</div>;
    }
  }
  render() {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          퇴직금 처리 방침
        </Typography>
        <Container>{this.setPages()}</Container>
      </div>
    );
  }
}

export default Agree;
