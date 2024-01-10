import React, { Suspense, lazy } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Loading from './Loading';
import ApiCall from "./ApiCall";
import { Pagination } from "./Pagination";
import ItemDetails from "./ProductsImages/ItemDetails";
import Toasts from "./Toasts";
import Envato from "./Designs/Envato";

const Homecompo = React.lazy(() => import('./Home'))
const Aboutpage = React.lazy(() => import('./About'))
const ApiCallpage = React.lazy(() => import('./ApiCall'))
const LazyLoadingpage = React.lazy(() => import('./Lazyload'))
const Paginationpage = React.lazy(() => import('./Pagination'))
const MoreImagesLoad = React.lazy(() => import('./LazyImages/MoreImagesLoad'))
const ProductsImages = React.lazy(() => import('./ProductsImages/Products'))
const ItemDetailsPage = React.lazy(() => import('./ProductsImages/ItemDetails'))
const LocalUseMemoPage = React.lazy(() => import('./Local'))
const SessionStoragePage = React.lazy(() => import('./Storages'))
// const Cruddata=React.lazy(()=>import('./Toasts'))


const AppRouting = () => {
    const linkstyle = {
        color: 'white',
        TextDecoder: 'none',
        marginRight: '10px',
        padding: '10px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    };

    return (
        <div>
            <BrowserRouter>
                <nav style={{ display: 'flex', backgroundColor: '#333', padding: '10px', position: 'sticky', top: '0', zIndex: '1' }}>
                    <Link to="/home" style={linkstyle}>HOME</Link>
                    <Link to="/about" style={linkstyle}>about</Link>
                    <Link to="/api" style={linkstyle}>LazyLoadingImages</Link>
                    <Link to="/lazy" style={linkstyle}>LazyLoading</Link>
                    <Link to="/page" style={linkstyle}>Pagination</Link>
                    <Link to="/moreimg" style={linkstyle}>MoreImagesLoad</Link>
                    <Link to="/products" style={linkstyle}>ProductsImages</Link>
                    {/* <Link to="/item" style={linkstyle}>ItemDetailsPage</Link> */}
                    <Link to="/local" style={linkstyle}>LocalUseMemoPage</Link>
                    <Link to="/storage" style={linkstyle}>sessionStoragepage</Link>
                    <Link to="/toast" style={linkstyle}>CrudOprations</Link>


                </nav>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route exact path="/home" element={<Homecompo />} />
                        <Route exact path="/about" element={<Aboutpage />} />
                        <Route exact path="/api" element={<Suspense fallback="image is loading">
                            <ApiCallpage />
                        </Suspense>} />
                        <Route exact path="/lazy" element={<LazyLoadingpage />} />
                        <Route exact path="/page" element={<Paginationpage />} />
                        <Route exact path="/moreimg" element={<MoreImagesLoad />} />
                        <Route exact path="/products" element={<ProductsImages />} />
                        <Route exact path="/items/:id" element={<ItemDetailsPage />} />
                        <Route exact path="/local" element={<LocalUseMemoPage />} />
                        <Route exact path="/storage" element={<SessionStoragePage />} />
                        <Route path="/toast" element={<Toasts />} />
                        <Route path="/envo" element={<Envato/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>

        </div>
    )
}
export default AppRouting;