import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

export const getMockProvider = (partialState) => {
    const mockStore = configureStore([]);
    const store = mockStore({
        ...partialState,
    });

    return {
        MockProvider: ({ children }) => (
            <Provider store={store}>
                {children}
            </Provider>
        ),
        store,
    };
};

// export const setup = (partialState) => {
//     const { MockProvider } = getMockProvider(partialState);

//     return {
//         MockProvider,
//     };
// };

export const sample = '';
// export default {
//     Provider: getMockProvider(partialState),
// };
