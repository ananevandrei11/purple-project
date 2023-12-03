import { Allerta_Stencil, Montserrat } from 'next/font/google';

export const dmSans = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat'
});

export const allertaStencil = Allerta_Stencil({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400'],
  variable: '--font-allerta-stencil'
});
