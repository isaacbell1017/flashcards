import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout, Spin } from "antd";

import Loading from "../components/Loading";

const { Content } = Layout;

import { routes } from "./routes";

import Navbar from "../components/Navbar";

// Pages

import Home from "../pages/Home";
import Game from "../pages/Game";

export const Router = (props: any) => {
  return (
    <Layout className="layout" style={{ minHeight: '100vh', maxWidth: '100vw' }}>
      <BrowserRouter>
        <>
          <Navbar />
          <Layout>
            <Content style={{ padding: "5vh 5vh" }}>
              <Suspense fallback={<Loading type="cylon" color="white" />}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/game" component={Game} />
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </>
      </BrowserRouter>
    </Layout>
  );
};

export default Router;
