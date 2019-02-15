import React, { Component } from "react";
import { Icon, Layout, Menu, Button } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";

const { Header } = Layout;

import colors from "../styles/globalColors";

import logo from "../assets/images/your-logo.png";

const navbarExclude: string[] = [];

interface State {
  current: string;
}

class Navbar extends Component<RouteComponentProps, State> {
  state: State = {
    current: this.props.location.pathname.includes("game") ? "game" : "home"
  };

  handleClick = (e: { key: string }) => {
    const key = e.key;
    this.setState({
      current: key
    });

    if(key.includes("home")) {
      this.props.history.push("/");
    } else {
      this.props.history.push(`/${key}`);
    }
  };

  render() {
    return (<>
      {!navbarExclude.includes(this.props.location.pathname) && (
        <Menu
          mode="horizontal"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          style={{
            fontWeight: "bold",
          }}
        >
          <Menu.Item key="home">
            <Icon type="home" /> Home
          </Menu.Item>
          <Menu.Item key="game">
            <Icon type="play-circle" /> Game
          </Menu.Item>
        </Menu>
      )}
    </>);
  }
}

const styles = {
  header: {}
}

export default withRouter(Navbar);
