import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const getContainer = (container) => {
    return typeof container === 'function' ? container() : container;
};

class Menu extends Component {
    static propTypes = {
        // items: PropTypes.array,
        open: PropTypes.bool,
        container: PropTypes.func,
    };

    static defaultProps = {
        container: () => document.body,
    };

    constructor(props) {
        super(props);

        const { container } = this.props;
        this.state = {
            mountNode: getContainer(container),
        };
    }

    renderMenu = () => {
        const { mountNode } = this.state;
        const El = <div className="tgc-select-menu">Menu</div>;
        console.log('mountNode', mountNode);
        return mountNode ? ReactDOM.createPortal(El, mountNode) : mountNode;
    };

    render() {
        const { open } = this.props;

        return open ? this.renderMenu() : null;
    }
}

export default Menu;
