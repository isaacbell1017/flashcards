import React, { Component } from 'react';
import GlobalStateProvider from "./context/GlobalStateContext";
import Router from "./routes";
import './App.css';

const App = () => (
  <GlobalStateProvider>
    <Router />
  </GlobalStateProvider>
)

export default App;
