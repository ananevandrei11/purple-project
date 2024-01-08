import Spinner from '@/public/Spinner.svg';

export function LoadingFull() {
  return (
    <section
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        width: '100dvw',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(2px)'
      }}>
      <Spinner />
    </section>
  );
}
