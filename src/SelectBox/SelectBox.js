import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputComponent from './InputComponent';
import Menu from './Menu';

import './style.scss';

class SelectBox extends Component {
    static propTypes = {
        items: PropTypes.array,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * 노드 텍스트 키
         */
        // labelKey: PropTypes.string,
        // /**
        //  * 노드 값 키
        //  */
        // valueKey: PropTypes.string,
        /**
         * 활성/비활성 여부
         */
        disabled: PropTypes.bool,
        /**
         * 읽기전용 여부
         */
        readOnly: PropTypes.bool,
        /**
         * 노드 선택시 호출
         */
        // onSelect: PropTypes.func,
        // /**
        //  * 노드 선택 change 시 호출
        //  */
        // onChange: PropTypes.func,
    };

    static defaultProps = {
        // items: [],
        width: '100%',
        height: 30,
        labelKey: 'label',
        valueKey: 'value',
    };

    constructor(props) {
        super(props);

        const { items, value } = this.props;
        this.state = {
            items,
            value,
            open: false,
        };
    }

    handleClick = () => {
        console.log('handleClick');
        const { open } = this.state;
        this.setState({
            open: !open,
        });
    };

    render() {
        const { className, name, width, height, disabled, readOnly } = this.props;
        const { value, items, open } = this.state;

        return (
            <div
                className={classNames(className, 'tgc-selectbox', {
                    'tgc-selectbox-disabled': disabled,
                    'tgc-selectbox-readonly': readOnly,
                })}
                style={{ width }}
            >
                <input type="hidden" name={name} value={Array.isArray(value) ? value.join(',') : value} />
                <InputComponent width={width} height={height} onClick={this.handleClick} />
                <Menu open={open} items={items} />
            </div>
        );
    }
}

export default SelectBox;
