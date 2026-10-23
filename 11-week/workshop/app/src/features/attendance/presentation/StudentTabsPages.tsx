
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { QrRegistrationForm } from '../forms/QrRegistrationForm';

export const ClassesPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Mis clases</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      <h1>Clases y sesiones</h1>
      <p>Consulta las clases asociadas a tus cursos.</p>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Información de clases</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Aquí podrás consultar las sesiones de tus cursos
          y acceder a sus detalles.
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
);

export const QrScanPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Registro QR</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      <h1>Registrar asistencia</h1>
      <p>
        Ingresa el código QR generado por el profesor
        para validar tu asistencia.
      </p>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Código de la sesión</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <QrRegistrationForm />
        </IonCardContent>
      </IonCard>

      <p>
        Esta es una demostración de la interfaz.
        El registro real requiere conexión con el backend.
      </p>
    </IonContent>
  </IonPage>
);
