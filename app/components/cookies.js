'use client';
import CookieConsent from 'react-cookie-consent';

export default function Cookies() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="OK"
      cookieName="myAwesomeCookieName2"
      style={{ background: '#2B373B', fontWeight: '200' }}
      buttonStyle={{
        background: '#3f83f8',
        color: '#ffffff',
        fontSize: '13px',
      }}
      expires={150}
    >
      Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach
      statystycznych, reklamowych oraz funkcjonalnych. Dzięki nim możemy
      indywidualnie dostosować stronę do twoich potrzeb. Każdy może zaakceptować
      pliki cookies albo ma możliwość wyłączenia ich w przeglądarce, dzięki
      czemu nie będą zbierane żadne informacje.
    </CookieConsent>
  );
}
