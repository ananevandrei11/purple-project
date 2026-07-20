'use client';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import { Facebook, Instagram, LinkedIn, Twitter } from '@/Icon';
import { InputGroup, TextElement } from '@/components';

const INFO_INK = [
  { id: 1, href: '/contact', text: 'Контакты' },
  { id: 2, href: '/terms-of-purchase', text: 'Условия покупки' },
  { id: 3, href: '/delivery-and-return', text: 'Доставка и возврат' }
];

const SOCIAL_INK = [
  { id: 1, href: '', icon: <LinkedIn /> },
  { id: 2, href: '/', icon: <Facebook /> },
  { id: 3, href: '/', icon: <Instagram /> },
  { id: 4, href: '/', icon: <Twitter /> }
];

export function Footer() {
  const currentPath = usePathname();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      console.warn('Поле обязательно для заполнения');
      return;
    }
    toast.success(`Email ${email} отправлен.`);
    setEmail('');
    return;
  };

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        {INFO_INK.map((link) => (
          <Link
            key={link.id}
            aria-current={link.href === currentPath}
            className={styles.link}
            href={link.href}>
            <TextElement tag="span" variant="heading5">
              {link.text}
            </TextElement>
          </Link>
        ))}
      </nav>
      <form onSubmit={handleSubmit} name="subscribe" className={styles.subscribe}>
        <InputGroup>
          <InputGroup.Input
            isAddonRight
            type="email"
            id="subscribe-email"
            name="subscribe-email"
            autoComplete="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Введите ваш email"
          />
          <InputGroup.Addon type="submit" variant="arrow" side="right" />
        </InputGroup>
      </form>
      <TextElement variant="heading5" tag="p" className={styles.copyright}>
        &copy; 2024 Shoppe
      </TextElement>
      <ul className={styles.social}>
        {SOCIAL_INK.map((link) => (
          <li key={link.id} className={styles.socialItem}>
            <a
              href={link.href}
              target="blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
