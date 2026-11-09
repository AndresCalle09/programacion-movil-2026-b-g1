
import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonText,
  IonSpinner,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';

import { login, getUserProfile, User } from '../services/authService';
import './Home.css';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inicio');

  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [token, setToken] = useState('');

  const getLocation = async () => {
    setLoading(true);
    setLocationError('');
    setLocation('');

    try {
      if (Capacitor.isNativePlatform()) {
        let permission = await Geolocation.checkPermissions();

        if (permission.location !== 'granted') {
          permission = await Geolocation.requestPermissions();
        }

        if (permission.location !== 'granted') {
          throw new Error('No se concedió el permiso de ubicación.');
        }
      }

      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      setLocation(
        `Latitud: ${coordinates.coords.latitude.toFixed(5)}, Longitud: ${coordinates.coords.longitude.toFixed(5)}`
      );
    } catch (err) {
      setLocationError(
        err instanceof Error
          ? err.message
          : 'No fue posible obtener la ubicación.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    setUser(null);
    setToken('');

    try {
      if (!navigator.onLine) {
        throw new Error('No tienes conexión a Internet.');
      }

      const result = await login(username, password);
      setToken(result.accessToken);

      const profile = await getUserProfile(result.accessToken);
      setUser(profile);
    } catch (err) {
      if (!navigator.onLine) {
        setAuthError('No tienes conexión a Internet.');
      } else if (err instanceof TypeError) {
        setAuthError('No fue posible conectar con el servidor.');
      } else {
        setAuthError(
          err instanceof Error ? err.message : 'Error al iniciar sesión.'
        );
      }

      setToken('');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Membership Manager</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-content">

        <IonSegment
          value={activeTab}
          onIonChange={(e) => setActiveTab(String(e.detail.value))}
        >
          <IonSegmentButton value="inicio">
            <IonLabel>Inicio</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton value="cuenta">
            <IonLabel>Cuenta</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton value="ubicacion">
            <IonLabel>Ubicación</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {activeTab === 'inicio' && (
          <>
            <div className="welcome">
              <h1>Mis membresías</h1>
              <p>Administra tus servicios y pagos mensuales.</p>
            </div>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Resumen de pagos</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <h2>3 membresías registradas</h2>
                <p>Consulta tus próximas fechas de pago.</p>
              </IonCardContent>
            </IonCard>

            <h2 className="section-title">Mis servicios</h2>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Netflix</IonCardTitle>
                <IonBadge color="success">Activo</IonBadge>
              </IonCardHeader>
              <IonCardContent>
                <p>Pago mensual: $25.900</p>
                <p>Próximo pago: 15 de noviembre</p>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Spotify</IonCardTitle>
                <IonBadge color="success">Activo</IonBadge>
              </IonCardHeader>
              <IonCardContent>
                <p>Pago mensual: $16.900</p>
                <p>Próximo pago: 20 de noviembre</p>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Gimnasio</IonCardTitle>
                <IonBadge color="warning">Por renovar</IonBadge>
              </IonCardHeader>
              <IonCardContent>
                <p>Pago mensual: $60.000</p>
                <p>Próximo pago: 10 de noviembre</p>
              </IonCardContent>
            </IonCard>
          </>
        )}

        {activeTab === 'cuenta' && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Cuenta de usuario</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              {!user && (
                <>
                  <IonItem>
                    <IonLabel position="stacked">Usuario</IonLabel>
                    <IonInput
                      value={username}
                      placeholder="Ingresa tu usuario"
                      onIonInput={(e) =>
                        setUsername(e.detail.value ?? '')
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Contraseña</IonLabel>
                    <IonInput
                      type="password"
                      value={password}
                      placeholder="Ingresa tu contraseña"
                      onIonInput={(e) =>
                        setPassword(e.detail.value ?? '')
                      }
                    />
                  </IonItem>

                  <IonButton
                    expand="block"
                    onClick={handleLogin}
                    disabled={
                      authLoading || !username.trim() || !password
                    }
                  >
                    {authLoading ? 'Ingresando...' : 'Iniciar sesión'}
                  </IonButton>
                </>
              )}

              {authLoading && <IonSpinner name="crescent" />}

              {authError && (
                <IonText color="danger">
                  <p>{authError}</p>
                </IonText>
              )}

              {user && (
                <>
                  <IonText color="success">
                    <h2>¡Bienvenido, {user.firstName}!</h2>
                    <p>Usuario: {user.username}</p>
                    <p>Correo: {user.email}</p>
                  </IonText>

                  <IonBadge color="success">
                    Sesión autenticada
                  </IonBadge>

                  <IonButton
                    expand="block"
                    fill="outline"
                    color="danger"
                    onClick={() => {
                      setUser(null);
                      setToken('');
                      setUsername('');
                      setPassword('');
                    }}
                  >
                    Cerrar sesión
                  </IonButton>
                </>
              )}

              {token && (
                <p>Token recibido y utilizado para consultar el perfil.</p>
              )}
            </IonCardContent>
          </IonCard>
        )}

        {activeTab === 'ubicacion' && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Ubicación del dispositivo</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                Consulta tu ubicación después de conceder el permiso.
              </p>

              <IonButton
                expand="block"
                onClick={getLocation}
                disabled={loading}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  'Obtener mi ubicación'
                )}
              </IonButton>

              {location && (
                <IonText color="success">
                  <p>{location}</p>
                </IonText>
              )}

              {locationError && (
                <IonText color="danger">
                  <p>{locationError}</p>
                </IonText>
              )}
            </IonCardContent>
          </IonCard>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Home;
