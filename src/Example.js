import React, {
    useState,
    // useEffect,
    // useMemo,
    useCallback,
    // useRef,
} from 'react';

import SelectBox from './SelectBox';

const items = [
    { label: '더기프팅컴퍼니', value: '0' },
    { label: '월간가슴', value: '1' },
    { label: '언더웨어', value: '2' },
    { label: '프론트엔드 엔지니어', value: '3' },
];

const items1 = [
    { name: '아웃도어', price: '1000' },
    { name: '청바지', price: '7000' },
    { name: '언더웨어', price: '2000' },
    { name: '원피스', price: '3000' },
];

const Example = () => {
    const [selectItem, setSelectItem] = useState('');
    const [changeItem, setChangeItem] = useState('');

    const onSelect = useCallback((selectedItem) => {
        console.log('선택한 데이터: ', selectedItem);
        const itemString = JSON.stringify(selectedItem);
        setSelectItem(itemString);
    }, []);

    const onChange = useCallback((selectedItem) => {
        console.log('선택한 데이터: ', selectedItem);
        const itemString = JSON.stringify(selectedItem);
        setChangeItem(itemString);
    }, []);

    return (
        <div>
            <div>
                기본
                <SelectBox items={items} />
            </div>

            <div style={{ display: 'flex', paddingTop: 15 }}>
                <div style={{ marginRight: 10 }}>
                    가로 길이(width=300)
                    <SelectBox items={items} width={300} placeholder="선택하세요." />
                </div>
                <div style={{ marginRight: 10 }}>
                    disabled
                    <SelectBox value="1" items={items} width={300} disabled />
                </div>
                <div>
                    readOnly
                    <SelectBox value="0" items={items} width={300} readOnly />
                </div>
            </div>
            <div style={{ display: 'flex', paddingTop: 15 }}>
                <div style={{ marginRight: 150 }}>
                    onSelect
                    <SelectBox items={items} width={300} onSelect={onSelect} placeholder="Console 창도 확인해주세요." />
                    {selectItem && `onSelect 선택한 데이터: ${selectItem}`}
                </div>
                <div>
                    onChange
                    <SelectBox items={items} width={300} onChange={onChange} placeholder="Console 창도 확인해주세요." />
                    {changeItem && `onChange 선택한 데이터: ${changeItem}`}
                </div>
            </div>
            <div style={{ display: 'flex', paddingTop: 15 }}>
                <div style={{ marginRight: 10 }}>
                    labelKey/valueKey
                    <SelectBox items={items1} labelKey="name" valueKey="price" width={500} placeholder="선택하세요." />
                </div>
            </div>
        </div>
    );
};

export default Example;
