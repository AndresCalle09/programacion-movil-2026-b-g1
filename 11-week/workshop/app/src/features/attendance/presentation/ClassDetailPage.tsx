
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonSpinner, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent,
} from '@ionic/react';

const classes = [
  { id: '101', name: 'Programación Móvil', date: '19/10/2026', time: '18:30' },
  { id: '102', name: 'Desarrollo Fullstack', date: '20/10/2026', time: '18:30' },
];

export const ClassDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    setState('loading');
    const timer = setTimeout(() => {
      setState(id === 'error' ? 'error' : 'success');
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const selected = classes.find((item) => item.id === id);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Detalle de clase</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton fill="outline" onClick={() => history.push('/tabs/clases')}>
          Volver a clases
        </IonButton>

        {state === 'loading' && <IonSpinner name="crescent" />}

        {state === 'error' && (
          <div role="alert">
            <h2>Error al cargar la clase</h2>
            <IonButton onClick={() => setState('loading')}>
              Reintentar
            </IonButton>
          </div>
        )}

        {state === 'success' && !selected && (
          <h2>Clase no encontrada</h2>
        )}

        {state === 'success' && selected && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{selected.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Sesión: {selected.id}</p>
              <p>Fecha: {selected.date}</p>
              <p>Hora: {selected.time}</p>
              <p>Información de demostración</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

