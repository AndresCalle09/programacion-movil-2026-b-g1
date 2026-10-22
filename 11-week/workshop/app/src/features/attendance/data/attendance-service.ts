
export interface AttendanceRecord {
  id: number;
  courseName: string;
  classSessionId: number;
  dateTime: string;
  status: 'PRESENT' | 'ABSENT';
}

export type AttendanceScenario =
  | 'success'
  | 'empty'
  | 'error'
  | 'retry';

const records: AttendanceRecord[] = [
  {
    id: 1,
    courseName: 'Programación Móvil',
    classSessionId: 101,
    dateTime: '2026-10-19T18:30:00',
    status: 'PRESENT',
  },
  {
    id: 2,
    courseName: 'Desarrollo Fullstack',
    classSessionId: 102,
    dateTime: '2026-10-20T18:30:00',
    status: 'ABSENT',
  },
];

let retryAttempts = 0;

export async function getAttendanceHistory(
  scenario: AttendanceScenario = 'success',
  delayMs = 800,
): Promise<AttendanceRecord[]> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });

  if (scenario === 'error') {
    throw new Error('No se pudo cargar el historial de asistencia.');
  }

  if (scenario === 'retry') {
    retryAttempts += 1;

    if (retryAttempts === 1) {
      throw new Error('Error temporal al cargar asistencias.');
    }
  }

  if (scenario === 'empty') {
    return [];
  }

  return records;
}

export function resetAttendanceRetry(): void {
  retryAttempts = 0;
}
