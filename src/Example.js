import React from 'react';

import SelectBox from './SelectBox';

const Example = () => {
    return (
        <div>
            <div>
                Example
                <SelectBox />
            </div>

            <div>
                가로 길이
                <SelectBox width={200} />
            </div>
        </div>
    );
};

export default Example;
