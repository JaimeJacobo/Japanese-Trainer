import React from "react";
import styled from "@emotion/styled";
import Slide from "./Slide";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.3);
}


`;

const NavigationButtons = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 20%;
  margin-top: 2rem;
  justify-content: space-between;
  z-index: 1000;
`;

const NavBtn = styled.div`
  background: floralwhite;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

function mod(a, b) {
  return ((a % b) + b) % b;
}

class VerticalCarousel extends React.Component {
  state = {
    index: 0,
    goToSlide: null,
    prevPropsGoToSlide: 0,
    newSlide: false,
    slides: [{ key: "", content: "" }],
  };

  componentDidMount() {
    const slidesContent = this.props.content.map((word, index) => {
      return { key: index + 1, content: word };
    });
    this.setState({ slides: slidesContent });
  }

  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        content: PropTypes.object,
      })
    ).isRequired,
    goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number,
    animationConfig: PropTypes.object,
  };

  static defaultProps = {
    offsetRadius: 2,
    animationConfig: { tension: 120, friction: 14 },
  };

  modBySlidesLength = (index) => {
    return mod(index, this.state.slides.length);
  };

  moveSlide = (direction) => {
    this.setState({
      index: this.modBySlidesLength(this.state.index + direction),
      goToSlide: null,
    });
  };

  clampOffsetRadius(offsetRadius) {
    // const { slides } = this.props;
    const upperBound = Math.floor((this.state.slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  getPresentableSlides() {
    // const { slides } = this.props;
    const { index } = this.state;
    let { offsetRadius } = this.props;
    offsetRadius = this.clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(
        this.state.slides[this.modBySlidesLength(index + i)]
      );
    }

    return presentableSlides;
  }

  render() {
    const { animationConfig, offsetRadius, showNavigation } = this.props;

    let navigationButtons = null;
    if (showNavigation) {
      navigationButtons = (
        <NavigationButtons>
          <NavBtn id={this.props.id + "_up"} onClick={() => this.moveSlide(1)}>
            &#8593;
          </NavBtn>
          <NavBtn
            id={this.props.id + "_down"}
            onClick={() => this.moveSlide(-1)}
          >
            &#8595;
          </NavBtn>
        </NavigationButtons>
      );
    }
    return (
      <>
        <Wrapper>
          {this.getPresentableSlides().map((slide, presentableIndex) => (
            <Slide
              key={slide.key}
              content={slide.content}
              moveSlide={this.moveSlide}
              offsetRadius={this.clampOffsetRadius(offsetRadius)}
              index={presentableIndex}
              animationConfig={animationConfig}
            />
          ))}
        </Wrapper>
        {navigationButtons}
      </>
    );
  }
}

export default VerticalCarousel;
