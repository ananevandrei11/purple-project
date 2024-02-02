import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

interface ISession {
  token: string;
  name: string;
  email: string;
}

export function useSession() {
  const session = useReadLocalStorage<ISession | null>('purple-session');
  const [updatedSession, setSession] = useLocalStorage<ISession | null>('purple-session', session);

  const addSession = (session: ISession) => {
    setSession((prev) => ({ ...prev, ...session }));
  };

  return {
    session: updatedSession,
    addSession
  };
}
