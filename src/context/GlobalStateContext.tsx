import React, { Component, ReactNode, Provider } from "react";
import { GlobalState } from "../interfaces/index";

export const GlobalStateContext = React.createContext<GlobalState>({
  loading: false,
  errors: [],
  updateGlobalState: () => {},
  correctAnswers: 0,
  totalAnswers: 0
});

class GlobalStateProvider extends React.Component<{}, GlobalState> {
  update = (updatedState: GlobalState) => {
    this.setState((prevState: any) => ({
      ...prevState,
      ...updatedState
    }),
    () => {
      console.log(updatedState);
      console.log('update context', this.state);
    });
  };

  state: GlobalState = {
    loading: false,
    errors: [],
    updateGlobalState: this.update,
    correctAnswers: 0,
    totalAnswers: 0
  };

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateProvider;
