import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import store from '../../store';

export const HomeRoute = ({  }) => {
    return (
        <div>hola</div>
    )
}

const mapStateToPros = (state) => ({
});

export const Home = connect(mapStateToPros)(HomeRoute);
