
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  getAttendanceHistory,
  type AttendanceRecord,
  type AttendanceScenario,
} from '../data/attendance-service';

type LoadState = 'loading' | 'success' | 'error';

export const AttendanceHistoryPage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [state, setState] = useState<LoadState>('loading');
  const retryFailed = useRef(false);

  const params = new URLSearchParams(window.location.search);
  const requestedScenario = params.get('scenario');

  const scenario: AttendanceScenario =
    requestedScenario === 'error' ||
    requestedScenario === 'empty' ||
    requestedScenario === 'retry'
      ? requestedScenario
      : 'success';

  const loadHistory = useCallback(async () => {
  setState('loading');

  try {
    if (scenario === 'retry' && !retryFailed.current) {
      retryFailed.current = true;
      await getAttendanceHistory('error');
    }

    const data = await getAttendanceHistory(
      scenario === 'retry' ? 'success' : scenario
    );

    setRecords(data);
    setState('success');
  } catch {
    setState('error');
  }
}, [scenario]);

  useEffect(() => {
  void loadHistory();
}, [loadHistory]);

  const refreshHistory = async (event: CustomEvent) => {
    try {
      await loadHistory();
    } finally {
      event.detail.complete();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Historial de asistencia</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRefresher
          slot="fixed"
          onIonRefresh={refreshHistory}
        >
          <IonRefresherContent />
        </IonRefresher>

        {state === 'loading' && (
          <IonList aria-label="Cargando historial">
            {[1, 2, 3].map((item) => (
              <IonItem key={item}>
                <IonLabel>
                  <IonSkeletonText
                    animated
                    style={{ width: '70%' }}
                  />
                  <IonSkeletonText
                    animated
                    style={{ width: '45%' }}
                  />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        {state === 'error' && (
          <div role="alert">
            <h2>No se pudo cargar el historial</h2>
            <p>Comprueba tu conexión e inténtalo nuevamente.</p>
            <IonButton onClick={() => void loadHistory()}>
              Reintentar
            </IonButton>
          </div>
        )}

        {state === 'success' && records.length === 0 && (
          <div>
            <h2>Aún no tienes asistencias registradas</h2>
            <p>
              Cuando registres asistencia con un QR,
              aparecerá aquí.
            </p>
            <IonButton routerLink="/tabs/escanear">
              Ir a escanear QR
            </IonButton>
          </div>
        )}

        {state === 'success' && records.length > 0 && (
          <IonList>
            {records.map((record) => (
              <IonItem key={record.id}>
                <IonLabel>
                  <h2>{record.courseName}</h2>
                  <p>
                    {new Date(record.dateTime).toLocaleString('es-CO')}
                  </p>
                  <p>
                    {record.status === 'PRESENT'
                      ? 'Asistencia registrada'
                      : 'Ausencia'}
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};
