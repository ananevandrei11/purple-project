import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

interface ISession {
  token: string;
  name?: string;
  email: string;
  phone?: string;
  address?: string;
  expiredAt?: number;
}

export function useSession() {
  const session = useReadLocalStorage<ISession | null>('purple-session');
  const [updatedSession, setSession] = useLocalStorage<ISession | null>('purple-session', session);

  const addSession = (session: ISession) => {
    setSession((prev) => ({ ...prev, ...session }));
  };

  const clearSession = () => {
    setSession(null);
  };

  return {
    session: updatedSession,
    addSession,
    clearSession
  };
}
