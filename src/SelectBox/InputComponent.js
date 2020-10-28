import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputComponent extends Component {
    static propTypes = {
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

    render() {
        const { width, height } = this.props;
        const { open } = this.state;

        return (
            <div className="tgc-input-component" style={{ width, height }} onClick={this.onClick}>
                <div
                    className="tgc-input-value"
                    style={{ width: `calc(${width}${typeof width === 'number' ? 'px' : ''} - 30px)` }}
                >
                    값
                </div>
                <div className="tgc-input-divider" />
                <div className="tgc-input-arrow" style={{ width: 30 }}>
                    {open ? '∧' : '∨'}
                </div>
                {/** ∧ */}
            </div>
        );
    }
}

export default InputComponent;
