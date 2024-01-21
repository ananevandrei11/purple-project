import { Error } from '@/page-components';

export default function Custom404() {
  return (
    <Error code={404} description="Страница не найдена, попробуйте перейти на главную страницу" />
  );
}
