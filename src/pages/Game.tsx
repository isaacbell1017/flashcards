import React from "react";

import { GlobalState } from "../interfaces/index";
import GlobalStateProvider from "../context/GlobalStateContext";
import { GlobalStateContext } from "../context/GlobalStateContext";

import GameMain from "./game/GameMain";

const Game = () => (
  <GlobalStateContext.Consumer>
    {({
      loading,
      errors,
      updateGlobalState,
      correctAnswers,
      totalAnswers
    }: GlobalState) => (
      <GameMain
        loading={loading}
        errors={errors}
        correctAnswers={correctAnswers}
        totalAnswers={totalAnswers}
        updateGlobalState={updateGlobalState}
      />
    )}
  </GlobalStateContext.Consumer>
);

export default Game;
