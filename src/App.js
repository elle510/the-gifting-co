import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader/root';

import Example from './Example';

class App extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {}

    render() {
        return <Example />;
    }
}

export default hot(App);
