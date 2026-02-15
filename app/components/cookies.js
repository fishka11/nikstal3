'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { setCookieConsent } from '../actions/cookies';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sprawdź czy użytkownik już wybrał
    const consent = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookie-consent='));

    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await setCookieConsent('accepted');
      setShowBanner(false);
    } catch (error) {
      console.error('Error setting cookie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    setIsLoading(true);
    try {
      await setCookieConsent('declined');
      setShowBanner(false);
    } catch (error) {
      console.error('Error setting cookie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 z-50 w-full bg-slate-800 p-4 text-white shadow-lg"
      role="dialog"
      aria-live="polite"
      aria-label="Zgoda na cookies"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm font-light">
          Ta strona używa plików cookies w celach statystycznych, reklamowych
          oraz funkcjonalnych. Dzięki nim możemy indywidualnie dostosować stronę
          do Twoich potrzeb.{' '}
          <Link
            href="/polityka-prywatnosci"
            className="text-blue-300 underline transition-colors hover:text-blue-200"
          >
            Dowiedz się więcej
          </Link>
          .
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            disabled={isLoading}
            className="rounded-md bg-slate-500 px-6 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Odrzuć cookies"
          >
            {isLoading ? 'Zapisywanie...' : 'Odrzuć'}
          </button>

          <button
            onClick={handleAccept}
            disabled={isLoading}
            className="rounded-md bg-blue-500 px-6 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Zaakceptuj cookies"
          >
            {isLoading ? 'Zapisywanie...' : 'Akceptuję'}
          </button>
        </div>
      </div>
    </div>
  );
}
