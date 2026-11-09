import { describe, it, expect, vi, afterEach } from 'vitest';
import { login, getUserProfile } from './authService';

describe('Pruebas del servicio de autenticación', () => {

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('Debe iniciar sesión correctamente y obtener un token', async () => {
    const respuesta = {
      accessToken: 'token-de-prueba',
      refreshToken: 'refresh-de-prueba',
      id: 1,
      username: 'emilys',
      email: 'emily@example.com',
      firstName: 'Emily',
      lastName: 'Johnson'
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => respuesta
    }));

    const resultado = await login('emilys', 'emilyspass');

    expect(resultado.accessToken).toBe('token-de-prueba');
    expect(resultado.username).toBe('emilys');
  });

  it('Debe mostrar un error cuando las credenciales son incorrectas', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 401
    }));

    await expect(login('usuario', 'clave-incorrecta'))
      .rejects.toThrow('Usuario o contraseña incorrectos.');
  });

  it('Debe detectar cuando el token no es válido', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 401
    }));

    await expect(getUserProfile('token-invalido'))
      .rejects.toThrow('401: Tu sesión expiró o el token no es válido.');
  });

});