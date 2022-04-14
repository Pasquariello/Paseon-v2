import React, {
    lazy,
    Suspense,
    Fragment
  } from 'react';
  import {
    Switch,
    Redirect,
    Route
  } from 'react-router-dom';
  import DashboardLayout from 'src/layouts/DashboardLayout/index';
  
//   import MainLayout from 'src/layouts/MainLayout';
//   import HomeView from 'src/views/pages/HomeView';
  import LoadingScreen from 'src/components/LoadingScreen';
  import AuthGuard from 'src/components/AuthGuard';
  import GuestGuard from 'src/components/GuestGuard';
  const routesConfig = [
    {
      exact: true,
      path: '/',
      component: () => <Redirect to="/login" />
    },
    // {
    //   exact: true,
    //   path: '/404',
    //   component: lazy(() => import('src/views/pages/Error404View'))
    // },
    {
      exact: true,
      guard: GuestGuard,
      path: '/login',
      component: lazy(() => import('src/views/auth/LoginView'))
    },
    {
      exact: true,
      guard: GuestGuard,
      path: '/create-account',
      component: lazy(() => import('src/views/auth/createAccount'))
    },
    // {
    //   exact: true,
    //   path: '/login-unprotected',
    //   component: lazy(() => import('src/views/auth/LoginView'))
    // },
    // {
    //   exact: true,
    //   guard: GuestGuard,
    //   path: '/register',
    //   component: lazy(() => import('src/views/auth/RegisterView'))
    // },
    // {
    //   exact: true,
    //   path: '/register-unprotected',
    //   component: lazy(() => import('src/views/auth/RegisterView'))
    // },
    {
      path: '/app',
      // guard: AuthGuard,
      layout: DashboardLayout,
      routes: [
        // NEW
        {
          exact: true,
          path: '/app',
          component: () => <Redirect to="/app/dashboard" />
        },
        {
          exact: true,
          path: '/app/dashboard',
          component: lazy(() => import('src/views/dashboardView'))
        },
        {
          exact: true,
          path: '/app/form-builder',
          // component: lazy(() => import('src/views/formBuilderView'))
          component: lazy(() => import('src/views/formBuilderView/formBuilder'))

        },
        {
          exact: true,
          path: '/app/form-builder/test',
          // component: lazy(() => import('src/views/formBuilderView'))
          component: lazy(() => import('src/views/formBuilderViewTest/formBuilder'))

        },
        {
          exact: true,
          path: '/app/form-builder/details/:id',
          component: lazy(() => import('src/views/formBuilderView/details'))
        },
        {
          exact: true,
          path: '/app/form-builder/edit/:id',
          component: lazy(() => import('src/views/formBuilderView/formBuilder'))
        },
        {
          exact: true,
          path: '/app/test',
          component: lazy(() => import('src/views/testViews'))
        },
        // {
        //   component: () => <Redirect to="/404" />
        // }
    //   ]
    // },
    // {
    //   path: '*',
    //   layout: MainLayout,
    //   routes: [
    //     {
    //       exact: true,
    //       path: '/home',
    //       component: HomeView
    //     },
    //     {
    //       component: () => <Redirect to="/404" />
    //     }
        ]
    }
  ];
  const renderRoutes = (routes) => (routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes
                    ? renderRoutes(route.routes)
                      : <Component {...props} />}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : '');
  function Routes() {
    return renderRoutes(routesConfig);
  }
  export default Routes;