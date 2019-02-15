import React, { Component } from "react";
import { Col, Row } from "antd";

import { GlobalState } from "../../interfaces/index";

interface Props extends GlobalState {};

import MetricTile from "../../components/MetricTile";
import "../../styles/tile.css";

class HomeMain extends Component<Props, {}> {
  render() {
    const { correctAnswers, totalAnswers } = this.props;

    return (<>
      <Row type="flex" justify="center">
        <h1>Home</h1>
      </Row>
      <Row type="flex" justify="center">
        <h2>Your custom stats lie here.</h2>
      </Row>
      <Row gutter={16}>
        <Col md={12}>
          <MetricTile
            title="Number of Trivia Questions"
            content="4726"
          />
        </Col>
        <Col md={12}>
          <MetricTile
            title="Correct Answers"
            content={`${correctAnswers}`}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={12}>
          <MetricTile
            title="Total Answers"
            content={`${totalAnswers}`}
          />
        </Col>
        <Col md={12}>
          <MetricTile
            title="Score (out of 100)"
            content={`${
              totalAnswers === 0
              ? 0
              : (correctAnswers / totalAnswers) * 100
            }%`}
          />
        </Col>
      </Row>
    </>);
  }
}

export default HomeMain;
