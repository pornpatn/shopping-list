import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConfirmProvider } from "material-ui-confirm";
import Main from '../Main';

function Root({ store }) {
    return (
        <Provider store={store}>
            <ConfirmProvider>
                <Main />
            </ConfirmProvider>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
