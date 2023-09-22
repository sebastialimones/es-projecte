import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { ArticleItem } from '../../components/ArticleItem';
import store from '../../store';

const { dispatch } = store;

export const HomeRoute = ({ articles }) => {
    return (
        <div>hola</div>
    )
}

const mapStateToPros = (state) => ({
});

export const Home = connect(mapStateToPros)(HomeRoute);
