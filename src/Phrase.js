import React, { Component } from "react";
import VerticalCarousel from "./VerticalCarousel";
// import uuidv4 from "uuid";
import { config } from "react-spring";

let slides = [
  {
    key: 1,
    content: "1",
  },
  {
    key: 2,
    content: "2",
  },
  {
    key: 3,
    content: "2",
  },
  {
    key: 4,
    content: "3",
  },
  {
    key: 5,
    content: "4",
  },
  {
    key: 6,
    content: "5",
  },
  {
    key: 7,
    content: "6",
  },
  {
    key: 8,
    content: "7",
  },
];

export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  };

  render() {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "500px" }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <VerticalCarousel
            slides={slides}
            offsetRadius={this.state.offsetRadius}
            showNavigation={this.state.showNavigation}
            animationConfig={this.state.config}
            id="places"
          />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <VerticalCarousel
            slides={slides}
            offsetRadius={this.state.offsetRadius}
            showNavigation={this.state.showNavigation}
            animationConfig={this.state.config}
            id="adjective"
          />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <VerticalCarousel
            slides={slides}
            offsetRadius={this.state.offsetRadius}
            showNavigation={this.state.showNavigation}
            animationConfig={this.state.config}
            id="noun"
          />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <VerticalCarousel
            slides={slides}
            offsetRadius={this.state.offsetRadius}
            showNavigation={this.state.showNavigation}
            animationConfig={this.state.config}
            id="verb"
          />
        </div>
      </div>
    );
  }
}
