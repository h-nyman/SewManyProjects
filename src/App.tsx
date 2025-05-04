import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import Tab3 from './pages/AboutContact';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import TabBar from './components/TabBar';
import "./firebaseConfig";
import useAuthState from './useAuthState';

setupIonicReact();

const App: React.FC = () => {

  const authState = useAuthState()

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/projects/:id">
              <ProjectPage />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/welcome" />
            </Route>
            <Route path="/welcome" component={Welcome} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
          </IonRouterOutlet>
          <TabBar loggedIn={authState.user} />
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
