
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
        Esta sección permitirá registrar tu asistencia
        mediante el código QR generado por el profesor.
      </p>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Escaneo QR</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          La integración con la cámara y el registro de
          asistencia se implementarán posteriormente.
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
);
