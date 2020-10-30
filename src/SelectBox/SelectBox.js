import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputComponent from './InputComponent';
import Menu from './Menu';

import './style.scss';

class SelectBox extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        items: PropTypes.array,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        placeholder: PropTypes.string,
        /**
         * 노드 텍스트 키
         */
        labelKey: PropTypes.string,
        /**
         * 노드 값 키
         */
        valueKey: PropTypes.string,
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
        onSelect: PropTypes.func,
        /**
         * 노드 선택 change 시 호출
         */
        onChange: PropTypes.func,
    };

    static defaultProps = {
        // items: [],
        value: '',
        placeholder: '',
        width: '100%',
        height: 30,
        labelKey: 'label',
        valueKey: 'value',
    };

    constructor(props) {
        super(props);

        const { items, value, placeholder, labelKey } = this.props;
        const findItem = this.findItemByValue(value);
        this.state = {
            label: findItem ? findItem[labelKey] : placeholder,
            value,
            items,
            open: false,
            menuPos: { x: 0, y: 0 },
        };

        this.selectRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            typeof nextProps.items !== 'undefined' &&
            JSON.stringify(nextProps.items) !== JSON.stringify(prevState.items)
        ) {
            return { items: nextProps.items };
        }

        return null;
    }

    onSelect = (selectedItem) => {
        const { onSelect, labelKey, valueKey } = this.props;

        this.setState({
            label: selectedItem[labelKey],
            value: selectedItem[valueKey],
        });
        this.handleClick();
        if (onSelect) {
            onSelect(selectedItem);
        }
    };

    onChange = (selectedItem) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(selectedItem);
        }
    };

    handleClick = () => {
        const { height, disabled, readOnly } = this.props;
        const { open } = this.state;
        let menuPos = { x: 0, y: 0 };
        if (!open) {
            menuPos = {
                x: this.selectRef.current.offsetLeft,
                y: this.selectRef.current.offsetTop + height,
            };
        }

        this.setState({
            open: !open && !disabled && !readOnly,
            menuPos,
        });
    };

    findItemByValue = (value) => {
        const { items, valueKey } = this.props;
        const findItem =
            items &&
            items.find((item) => {
                if (typeof item === 'object') {
                    return item[valueKey] === value;
                }
                return item === value;
            });

        // console.log('findItem', findItem);
        return findItem;
    };

    render() {
        const { className, width, height, labelKey, valueKey, disabled, readOnly } = this.props;
        const { label, value, items, open, menuPos } = this.state;

        return (
            <div
                ref={this.selectRef}
                className={classNames(className, 'tgc-selectbox', {
                    'tgc-selectbox-disabled': disabled,
                    'tgc-selectbox-readonly': readOnly,
                })}
                style={{ width }}
            >
                <input type="hidden" value={Array.isArray(value) ? value.join(',') : value} tabIndex={-1} />
                <InputComponent
                    label={label}
                    width={width}
                    height={height}
                    disabled={disabled}
                    readOnly={readOnly}
                    onClick={this.handleClick}
                />
                <Menu
                    value={value}
                    items={items}
                    open={open}
                    width={width}
                    labelKey={labelKey}
                    valueKey={valueKey}
                    menuPos={menuPos}
                    onItemClick={this.onSelect}
                    onItemChange={this.onChange}
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

export default SelectBox;
