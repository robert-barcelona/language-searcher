import React from "react";
import { Container, Title } from "./Styled";
import PropTypes from "prop-types";

const Detail = props => {
  return (
    <Container color="rgba(10,0,200,0.5)">
      <h1>
        <Title color="white" size="20px">
          Detail about &quot;{props.word.word}&quot;
        </Title>
      </h1>
      <h2>
        <Title color="white">
          Is related to &quot;{props.word.forWord}&quot;
        </Title>
      </h2>
      <h2>
        <Title color="white">Strength: {props.word.strength}</Title>
      </h2>
    </Container>
  );
};

Detail.propTypes = {
  word: PropTypes.shape({
    word: PropTypes.string,
    forWord: PropTypes.string,
    strength: PropTypes.number
  }).isRequired
};
export default Detail;
