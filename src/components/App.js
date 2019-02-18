import React, { Fragment } from 'react';
import { Router } from "@reach/router";

// shared
import Header from './Header';
import Background from './Background';

// content
import About from './About';
import Experience from './Experience';
import Contact from './Contact';

export default class App extends React.Component {

  state = {
    selectedTab: null,
  }

  switchContent = (tabName) => this.setState({ selectedTab: tabName });

  render() {
    return (
      <Fragment>
        <Header/>
        <Router>
          <About path="about"/>
          <Experience path="experience"/>
          <Contact path="contact"/>
        </Router>
        <Background/>
      </Fragment>
    );
  }
}
