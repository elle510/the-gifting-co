import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const getContainer = (container) => {
    return typeof container === 'function' ? container() : container;
};

class Menu extends Component {
    static propTypes = {
        value: PropTypes.string,
        items: PropTypes.array,
        open: PropTypes.bool,
        container: PropTypes.func,
        labelKey: PropTypes.string,
        valueKey: PropTypes.string,
        menuPos: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        onItemClick: PropTypes.func,
        onItemChange: PropTypes.func,
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

    onItemClick = (e) => {
        const { onItemClick, onItemChange, labelKey, valueKey } = this.props;

        e.target.classList.add('tgc-select-selected');
        // console.log('e.target', e.target);
        const value = e.target.getAttribute('value');
        const text = e.target.textContent;
        const selectedItem = {
            [labelKey]: text,
            [valueKey]: value,
        };

        if (onItemClick) {
            onItemClick(selectedItem);
        }

        const valueString = JSON.stringify(value);
        if (this.prevValue !== valueString && onItemChange) {
            onItemChange(selectedItem);
        }
        this.prevValue = valueString;
    };

    renderMenuItem = () => {
        const { value, items, labelKey, valueKey } = this.props;
        const itemEl = items
            ? items.map((item, index) => {
                  let selected = false;
                  if (typeof item === 'object' && item[valueKey] === value) {
                      selected = true;
                  } else if (item === value) {
                      selected = true;
                  }
                  return (
                      <li
                          className={classNames({
                              'tgc-select-selected': selected,
                          })}
                          key={`select-item-${index}`}
                          value={item[valueKey]}
                          onClick={this.onItemClick}
                      >
                          {item[labelKey]}
                      </li>
                  );
              })
            : null;

        return itemEl;
    };

    renderMenu = () => {
        const { width, menuPos } = this.props;
        // const { mountNode } = this.state;
        const menuEl = (
            <div
                className="tgc-select-menu"
                style={{
                    width: `calc(${width}${typeof width === 'number' ? 'px' : ''} - 45px)`,
                    position: 'absolute',
                    left: menuPos.x,
                    top: menuPos.y,
                }}
            >
                <ul>{this.renderMenuItem()}</ul>
            </div>
        );
        // console.log('mountNode', mountNode);
        // return mountNode ? ReactDOM.createPortal(menuEl, mountNode) : mountNode;
        return menuEl;
    };

    renderMenuContainer = () => {
        const { mountNode } = this.state;
        const menuContainerEl = (
            <div
                style={{
                    position: 'fixed',
                    zIndex: 1300,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    left: 0,
                }}
            >
                <div
                    style={{
                        zIndex: -1,
                        position: 'fixed',
                        right: 0,
                        bottom: 0,
                        top: 0,
                        left: 0,
                        backgroundColor: 'transparent',
                    }}
                    onClick={this.props.onClick}
                />
                {this.renderMenu()}
            </div>
        );
        return mountNode ? ReactDOM.createPortal(menuContainerEl, mountNode) : mountNode;
    };

    render() {
        const { open } = this.props;

        return open ? this.renderMenuContainer() : null;
    }
}

export default Menu;
