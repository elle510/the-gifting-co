import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputComponent extends Component {
    static propTypes = {
        label: PropTypes.string,
        // items: PropTypes.array,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onClick: PropTypes.func,
    };

    static defaultProps = {
        width: '100%',
        height: 30,
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    onClick = () => {
        const { onClick } = this.props;
        const { open } = this.state;

        this.setState({
            open: !open,
        });

        if (onClick) {
            onClick();
        }
    };

    renderArrow = () => {
        const { disabled, readOnly } = this.props;
        const { open } = this.state;

        let arrow = '∨';
        if (disabled || readOnly) {
            return arrow;
        }

        arrow = open ? '∧' : '∨';
        return arrow;
    };

    render() {
        const { label, width, height } = this.props;

        return (
            <div className="tgc-input-component" style={{ width, height }} onClick={this.onClick}>
                <div
                    className="tgc-input-value"
                    style={{ width: `calc(${width}${typeof width === 'number' ? 'px' : ''} - 30px)` }}
                >
                    {label}
                </div>
                <div className="tgc-input-divider" />
                <div className="tgc-input-arrow" style={{ width: 30 }}>
                    {this.renderArrow()}
                </div>
            </div>
        );
    }
}

export default InputComponent;
