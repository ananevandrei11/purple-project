import { create } from 'axios';
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN; //  + '/api-demo';

export const apiStore = create({
  baseURL: DOMAIN,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
