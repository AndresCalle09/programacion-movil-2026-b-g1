
import { useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonSpinner,
  IonToast,
} from '@ionic/react';

export const QrRegistrationForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [error, setError] = useState('');

  const trimmedCode = code.trim();
  const isValid = trimmedCode.length >= 6 && trimmedCode.length <= 100;
  const showError = touched && !isValid;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    setLoading(true);
    setError('');

    try {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 800);
      });

      if (trimmedCode.toUpperCase() === 'ERROR123') {
        throw new Error('No fue posible validar el código QR.');
      }

      setToastOpen(true);
    } catch {
      setError(
        'No se pudo validar el código. Inténtalo nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IonItem>
        <IonInput
          label="Código QR de la clase"
          labelPlacement="stacked"
          value={code}
          placeholder="Ingresa el código de la sesión"
          maxlength={100}
          onIonInput={(event) => {
            setCode(String(event.detail.value ?? ''));
            setError('');
          }}
          onIonBlur={() => setTouched(true)}
          aria-label="Código QR de la clase"
          aria-invalid={showError ? 'true' : 'false'}
        />
      </IonItem>

      {showError && (
        <IonNote color="danger" role="alert">
          El código debe tener entre 6 y 100 caracteres.
        </IonNote>
      )}

      {error && (
        <IonNote color="danger" role="alert">
          {error}
        </IonNote>
      )}

      <IonButton
        expand="block"
        disabled={!isValid || loading}
        onClick={() => setConfirmOpen(true)}
        className="ion-margin-top"
      >
        {loading ? (
          <>
            <IonSpinner name="crescent" />
            <IonLabel className="ion-margin-start">
              Validando...
            </IonLabel>
          </>
        ) : (
          'Registrar asistencia'
        )}
      </IonButton>

      <IonAlert
        isOpen={confirmOpen}
        header="Confirmar código QR"
        message="¿Deseas validar este código de asistencia?"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Confirmar',
            handler: () => {
              void handleSubmit();
            },
          },
        ]}
        onDidDismiss={() => setConfirmOpen(false)}
      />

      <IonToast
        isOpen={toastOpen}
        message="Código validado en modo demostración. No se registró una asistencia real."
        duration={3000}
        color="success"
        onDidDismiss={() => setToastOpen(false)}
      />
    </>
  );
};
