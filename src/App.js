import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from './components/AppBar';
import Container from './components/Container';
import Loader from './components/Loader';

const Home = lazy(() =>
  import('./views/HomeView' /*webpackChunkName: "Home-view" */),
);
const Movies = lazy(() =>
  import('./views/MoviesVeiw' /*webpackChunkName: "Movies-view" */),
);
const FullInfo = lazy(() =>
  import('./views/FullInfoView' /*webpackChunkName: "FullInfoMovie-view" */),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/movies" exact>
            <Movies />
          </Route>

          <Route path="/movies/:movieId">
            <FullInfo />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={2000} />
    </Container>
  );
}
