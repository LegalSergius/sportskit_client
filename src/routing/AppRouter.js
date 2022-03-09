import React, {Suspense, useEffect, useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {
    ADD_PAGE, AUTH_PAGE, CATALOG, EDIT_PAGE, ENTER_PAGE, FORGOT_PASSWORD_PAGE, PRODUCT_PAGE,
    HOME_PAGE, INFORMATION_PAGE, MAP_PAGE, LIST_PAGE, REGISTRATION_PAGE, SERVICE_PANEL, BASKET_PAGE
} from "./routing_consts";
import {StateContext} from "../contexts";
import MediaQuery, {useMediaQuery} from "react-responsive";

const App = React.lazy(() => import('../components/special/HomePage'));
const InformationPage = React.lazy(() => import('../components/special/InformationPage'));
const MapPage = React.lazy(() => import('../components/MapPage'));
const AuthPage = React.lazy(() => import('../components/special/AuthPage'));
const LoginPage = React.lazy(() => import('../components/LoginPage'));
const RegistrationPage = React.lazy(() => import('../components/RegistrationPage'));
const ForgotPasswordPage = React.lazy(() => import('../components/ForgotPasswordPage'));
const ServicePanel = React.lazy(() => import('../components/special/ServicePanel'));
const Catalog = React.lazy(() => import('../components/special/Catalog'));
const ListPage = React.lazy(() => import('../components/ListPage'));
const AddPage = React.lazy(() => import('../components/AddPage'));
const EditPage = React.lazy(() => import('../components/EditPage'));
const ProductPage = React.lazy(() => import('../components/ProductPage'));
const BasketPage = React.lazy(() => import('../components/special/BasketPage'));
const Header = React.lazy(() => import('../components/Header'));

export const Navigation = ({exact, path, component: Component}) => (
    <Route
        exact={exact}
        path={path}
        render={(props) => (
            <>
                <Header />
                <Component {...props} />
            </>
        )}/>

)

function AppRouter() {
    const [isMobile, setIsMobile] = useState(false);
    const isMobileDevice = useMediaQuery({maxWidth: 992});

    useEffect(() => {
        setIsMobile(isMobileDevice);
    });

    return (
        <StateContext.Provider value={{isMobile}}>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Switch>
                   <Navigation
                       exact path={HOME_PAGE}
                       component={App}/>
                   <Navigation
                       path={INFORMATION_PAGE}
                       component={InformationPage}/>
                   <Navigation
                       path={MAP_PAGE}
                       component={MapPage}/>
                   <Navigation
                       exact path={CATALOG}
                       component={Catalog}/>
                   <Navigation
                       path={LIST_PAGE}
                       component={ListPage}>
                       <Route
                           path='/clothes'
                           component={ListPage} />
                       <Route
                           path='/equipment'
                           component={ListPage} />
                       <Route
                           path='/nutrition'
                           component={ListPage} />
                       <Route
                           path='/accessories'
                           component={ListPage} />
                   </Navigation>
                   <Navigation
                       path={PRODUCT_PAGE}
                       component={ProductPage}/>
                   <Navigation
                       path={BASKET_PAGE}
                       component={BasketPage} />
                   <Route
                       exact path={AUTH_PAGE}
                       component={AuthPage} />
                   <Route
                       path={ENTER_PAGE}
                       component={LoginPage} />
                   <Route
                       path={REGISTRATION_PAGE}
                       component={RegistrationPage} />
                   <Route
                       path={FORGOT_PASSWORD_PAGE}
                       component={ForgotPasswordPage} />
                   <Route
                       exact path={SERVICE_PANEL}
                       component={ServicePanel}/>
                   <Route
                       path={ADD_PAGE}
                       component={AddPage} />
                   <Route
                       path={EDIT_PAGE}
                       component={EditPage} />
                   <Redirect to={HOME_PAGE} />
                </Switch>
            </Suspense>
        </StateContext.Provider>
    );
}

export default AppRouter;