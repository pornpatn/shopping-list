import React, { useEffect } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    Outlet,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import Layout from '../Layout';
import LoginPage from '../../pages/LoginPage';
import ChecklistPage from '../../pages/ChecklistPage';
import ChecklistCheckingPage from '../../pages/ChecklistPage/ChecklistCheckingPage';
import ChecklistReviewPage from '../../pages/ChecklistPage/ChecklistReviewPage';
import SettingsPage from '../../pages/SettingsPage';
import ProductSettings from '../../pages/SettingsPage/ProductSettings';
import CategorySettings from '../../pages/SettingsPage/CategorySettings';
import TagSettings from '../../pages/SettingsPage/TagSettings';
import MarketSettings from '../../pages/SettingsPage/MarketSettings';
import { fetchCategoryList } from '../../../store/categorySlice';
import { fetchTagList } from '../../../store/tagSlice';
import { fetchProductList } from '../../../store/productSlice';
import { fetchMarketList } from '../../../store/marketSlice';

const getRouter = (dispatch) => createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        loader: () => {
            console.log('root loader');
            return null;
        },
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: 'checklist',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <ChecklistPage />
                    },
                    {
                        path: ':id',
                        element: <ChecklistCheckingPage />,
                        loader: ({ params }) => {
                            console.log('load checklist {params}');
                            return null;
                        },
                    },
                    {
                        path: ':id/review',
                        element: <ChecklistReviewPage />,
                        loader: ({ params }) => {
                            console.log('load checklist {params} for review');
                            return null;
                        },
                    },
                ],
            },
            {
                path: 'settings',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <SettingsPage />
                    },
                    {
                        path: 'products',
                        element: <ProductSettings />
                    },
                    {
                        path: 'categories',
                        element: <CategorySettings />
                    },
                    {
                        path: 'tags',
                        element: <TagSettings />
                    },
                    {
                        path: 'markets',
                        element: <MarketSettings />
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
], {
    basename: '/checklist',
});

function Main() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryList());
        dispatch(fetchTagList());
        dispatch(fetchProductList());
        dispatch(fetchMarketList());
    }, [dispatch]);

    return (
        <RouterProvider router={getRouter(dispatch)} />
    );
};

export default Main;
