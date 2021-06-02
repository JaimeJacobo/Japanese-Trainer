import React, { Component } from "react";
import VerticalCarousel from "./VerticalCarousel";
// import uuidv4 from "uuid";
import { config } from "react-spring";

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
            content={this.props.content.places}
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
            content={this.props.content.adjectives}
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
            content={this.props.content.nouns}
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
            content={this.props.content.verbs}
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
