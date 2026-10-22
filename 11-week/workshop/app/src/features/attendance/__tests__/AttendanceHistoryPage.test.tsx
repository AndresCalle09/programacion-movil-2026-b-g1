
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import type { PropsWithChildren } from 'react';

import { AttendanceHistoryPage } from
  '../presentation/AttendanceHistoryPage';
import { getAttendanceHistory } from '../data/attendance-service';

vi.mock('../data/attendance-service', () => ({
  getAttendanceHistory: vi.fn(),
  resetAttendanceRetry: vi.fn(),
}));

vi.mock('@ionic/react', () => {
  const Container = ({ children }: PropsWithChildren) => (
    <div>{children}</div>
  );

  const Button = ({
    children,
    onClick,
  }: PropsWithChildren<{ onClick?: () => void }>) => (
    <button onClick={onClick}>{children}</button>
  );

  return {
    IonPage: Container,
    IonHeader: Container,
    IonToolbar: Container,
    IonTitle: Container,
    IonContent: Container,
    IonList: Container,
    IonItem: Container,
    IonLabel: Container,
    IonRefresher: Container,
    IonRefresherContent: Container,
    IonSkeletonText: Container,
    IonButton: Button,
  };
});

const mockedHistory = vi.mocked(getAttendanceHistory);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  window.history.replaceState({}, '', '/');
});

describe('Attendance history error and retry', () => {
  it('shows an error and loads records after retry', async () => {
    window.history.replaceState(
      {},
      '',
      '/tabs/historial'
    );

    mockedHistory
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce([
        {
          id: 1,
          courseName: 'Programación Móvil',
          classSessionId: 101,
          dateTime: '2026-10-19T18:30:00',
          status: 'PRESENT',
        },
      ]);

    render(<AttendanceHistoryPage />);

    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(
      screen.getByText('No se pudo cargar el historial')
    ).toBeTruthy();

    fireEvent.click(screen.getByText('Reintentar'));

    await waitFor(() => {
      expect(screen.getByText('Programación Móvil')).toBeTruthy();
    });

    expect(mockedHistory).toHaveBeenCalledTimes(2);
  });
});
