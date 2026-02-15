import getData from "../lib/fetchAPI";
import { getFirmData } from "../lib/queries";

export default async function FirmData() {
  try {
    const data = await getData(getFirmData);
    const firmData = data?.firmsData?.[0];

    // Jeśli brak danych, nie renderuj nic
    if (!firmData) {
      return null;
    }

    return (
      <div className="container my-14 flex max-w-7xl flex-col items-center">
        <div className="text-center text-xl font-light">
          {/* Nazwa firmy */}
          {firmData.name && <p className="mb-2 font-bold">{firmData.name}</p>}

          {/* NIP */}
          {firmData.nip && (
            <p>
              NIP: <span className="font-bold">{firmData.nip}</span>
            </p>
          )}

          {/* REGON */}
          {firmData.regon && (
            <p>
              REGON: <span className="font-bold">{firmData.regon}</span>
            </p>
          )}

          {/* BDO */}
          {firmData.bdo && (
            <p>
              Nr BDO: <span className="font-bold">{firmData.bdo}</span>
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading firm data:", error);
    return null;
  }
}
