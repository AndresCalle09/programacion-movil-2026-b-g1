
import {
  IonButton, IonContent, IonHeader, IonPage,
  IonTitle, IonToolbar, IonCard, IonCardContent,
} from '@ionic/react';
import { QrRegistrationForm } from '../forms/QrRegistrationForm';

const sessions = [
  { id: '101', name: 'Programación Móvil', date: '19/10/2026' },
  { id: '102', name: 'Desarrollo Fullstack', date: '20/10/2026' },
];

export const ClassesPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Mis clases</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h1>Clases y sesiones</h1>
      <p>Sesiones de demostración de Attendance Control.</p>
      {sessions.map((session) => (
        <IonCard key={session.id}>
          <IonCardContent>
            <h2>{session.name}</h2>
            <p>{session.date}</p>
            <IonButton routerLink={`/clases/${session.id}`}>
              Ver detalle
            </IonButton>
          </IonCardContent>
        </IonCard>
      ))}
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
      <p>Ingresa el código de la sesión generado por el profesor.</p>
      <QrRegistrationForm />
      <p>Demostración: no se registra asistencia real.</p>
    </IonContent>
  </IonPage>
);
