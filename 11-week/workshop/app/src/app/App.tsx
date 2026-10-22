
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import {
  calendarOutline,
  qrCodeOutline,
  timeOutline,
} from 'ionicons/icons';

import { AttendanceHistoryPage } from
  '../features/attendance/presentation/AttendanceHistoryPage';

import {
  ClassesPage,
  QrScanPage,
} from '../features/attendance/presentation/StudentTabsPages';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route
            exact
            path="/tabs/historial"
            component={AttendanceHistoryPage}
          />
          <Route
            exact
            path="/tabs/clases"
            component={ClassesPage}
          />
          <Route
            exact
            path="/tabs/escanear"
            component={QrScanPage}
          />
          <Route exact path="/">
            <Redirect to="/tabs/historial" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton
            tab="historial"
            href="/tabs/historial"
            aria-label="Historial de asistencia"
          >
            <IonIcon icon={timeOutline} />
            <IonLabel>Historial</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="clases"
            href="/tabs/clases"
            aria-label="Mis clases"
          >
            <IonIcon icon={calendarOutline} />
            <IonLabel>Clases</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="escanear"
            href="/tabs/escanear"
            aria-label="Escanear código QR"
          >
            <IonIcon icon={qrCodeOutline} />
            <IonLabel>Escanear QR</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
