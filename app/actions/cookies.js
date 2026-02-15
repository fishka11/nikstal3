'use server';
import { cookies } from 'next/headers';

export async function setCookieConsent(value) {
  const cookieStore = await cookies();

  cookieStore.set('cookie-consent', value, {
    maxAge: 60 * 60 * 24 * 365, // 1 rok
    path: '/',
    httpOnly: false, // Musi być false żeby client mógł odczytać
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getCookieConsent() {
  const cookieStore = await cookies();
  const consent = cookieStore.get('cookie-consent');
  return consent?.value || null;
}
