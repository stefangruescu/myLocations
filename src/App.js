import GlobalStyle from './globalStyles';
import BottomNavbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';

import routes from './routes';
import Header from './Header';

const App = () => {
  return (
    <StylesProvider injectFirst>
      <GlobalStyle />
      <Header />
      <Router>
        <Switch>
          {Object.values(routes).map((route) => {
            const { exact, path, Component } = route;
            return (
              <Route exact={exact} path={path} key={path}>
                <Component />
              </Route>
            );
          })}
        </Switch>
        <BottomNavbar />
      </Router>
    </StylesProvider>
  );
};

export default App;
