import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CssBaseline, Container, Chip, Grid } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { PersonTag, RegionTag, AgeTag } from "../Components/Tags";
import "../Css/TagChoice.css";
class TagChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: 0,
      personString: "인원",
      region: "지역",
      age: 20,
      pageNum: 1,
      isRedirect: false
    };
    this.tagPage = this.tagPage.bind(this);
  }
  backOnClick = () => {
    const pageNum = this.state.pageNum;
    if (pageNum > 0) {
      this.setState({
        pageNum: pageNum - 1
      });
    } else {
      this.setState({
        isRedirect: true
      });
    }
  };
  personCallback = dataFromChild => {
    let personString = "";
    if (dataFromChild === 1) {
      personString = "1:1";
    } else if (dataFromChild === 2) {
      personString = "2:2";
    } else if (dataFromChild === 3) {
      personString = "3:3";
    } else if (dataFromChild === 4) {
      personString = "4:4";
    } else if (dataFromChild === 5) {
      personString = "모임";
    }
    this.setState({
      person: dataFromChild,
      personString: personString,
      pageNum: 2
    });
  };
  regionCallback = dataFromChild => {
    this.setState({
      region: dataFromChild,
      pageNum: 3
    });
  };
  ageCallback = dataFromChild => {
    if (dataFromChild < 20 || dataFromChild > 100) {
    } else {
      this.setState({
        age: dataFromChild,
        pageNum: 4
      });
    }
  };
  tagPage = () => {
    const pageNum = this.state.pageNum;
    if (pageNum === 0) {
      return <Redirect to="/main" />;
    } else if (pageNum === 1) {
      return <PersonTag callbackFromParent={this.personCallback} />;
    } else if (pageNum === 2) {
      return <RegionTag callbackFromParent={this.regionCallback} />;
    } else if (pageNum === 3) {
      return <AgeTag callbackFromParent={this.ageCallback} />;
    } else if (pageNum === 4) {
      return (
        <Redirect
          to={{
            pathname: "/write",
            state: {
              person: this.state.person,
              personString: this.state.personString,
              region: this.state.region,
              age: this.state.age
            }
          }}
        />
      );
    }
  };
  chipView = () => {
    const pageNum = this.state.pageNum;
    if (pageNum === 0) {
      return <div></div>;
    } else if (pageNum === 1) {
      return <div></div>;
    } else if (pageNum === 2) {
      return (
        <div>
          <Chip
            size="small"
            label={this.state.personString}
            color="primary"
            style={{ marginRight: "10px" }}
          />
        </div>
      );
    } else if (pageNum === 3) {
      return (
        <div>
          <Chip
            size="small"
            label={this.state.personString}
            color="primary"
            style={{ marginRight: "10px" }}
          />
          <Chip
            size="small"
            label={this.state.region}
            color="primary"
            style={{ marginRight: "10px" }}
          />
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <Container>
          <CssBaseline />
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={{ marginTop: "15px", marginLeft: "10px" }}
          >
            <Grid item>
              <ArrowBackIosIcon color="primary" onClick={this.backOnClick} />
            </Grid>
            {this.chipView()}
          </Grid>
          <div style={{ marginTop: "50px" }}>{this.tagPage()}</div>
        </Container>
      </div>
    );
  }
}

export default TagChoice;
