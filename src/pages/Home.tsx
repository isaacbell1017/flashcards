import React from "react";

import { GlobalState } from "../interfaces/index";
import GlobalStateProvider from "../context/GlobalStateContext";
import { GlobalStateContext } from "../context/GlobalStateContext";

import HomeMain from "./home/HomeMain";

const Home = () => (
  <GlobalStateContext.Consumer>
    {({
      loading,
      errors,
      updateGlobalState,
      correctAnswers,
      totalAnswers
    }: GlobalState) => (
      <HomeMain
        loading={loading}
        errors={errors}
        correctAnswers={correctAnswers}
        totalAnswers={totalAnswers}
        updateGlobalState={updateGlobalState}
      />
    )}
  </GlobalStateContext.Consumer>
);

export default Home;
