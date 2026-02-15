import getData from '../lib/fetchAPI';
import { getHeaderContent, getFirmData } from '../lib/queries';
import ContactBar from './contactBar';
import Menu from './menu';

export default async function Header() {
  try {
    // Równoległe wykonanie obu zapytań - szybsze!
    const [data1, data2] = await Promise.all([
      getData(getHeaderContent),
      getData(getFirmData),
    ]);

    const pages = data1?.staticPages;
    const phone = data2?.firmsData?.[0]?.phone;
    const email = data2?.firmsData?.[0]?.email;

    return (
      <div className="fixed top-0 z-50 w-screen backdrop-blur-sm">
        {/* Belka z kontaktem - tylko jeśli mamy dane */}
        {(phone || email) && <ContactBar phone={phone} email={email} />}

        {/* Menu - tylko jeśli mamy strony */}
        {pages && pages.length > 0 && <Menu pages={pages} />}
      </div>
    );
  } catch (error) {
    console.error('Error loading header:', error);

    // Fallback - minimalny header bez danych z API
    return (
      <header className="fixed top-0 z-50 w-screen backdrop-blur-sm">
        <Menu pages={[]} />
      </header>
    );
  }
}
