import React, { Component } from "react";
import VerticalCarousel from "./VerticalCarousel";
import styled from "@emotion/styled";
import { config } from "react-spring";

const Roulette = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  background-color: white;
  border: 3px solid black;
  margin: 50px 75px 75px 75px;
  -webkit-box-shadow: 5px 5px 22px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 22px 5px rgba(0, 0, 0, 0.3);
`;

export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  };

  render() {
    return (
      <Roulette>
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
            slides={[]}
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
            id="adjectives"
            slides={[]}
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
            id="nouns"
            slides={[]}
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
            id="verbs"
            slides={[]}
          />
        </div>
      </Roulette>
    );
  }
}
