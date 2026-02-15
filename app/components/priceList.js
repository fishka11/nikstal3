import getData from "../lib/fetchAPI";
import { getPriceList } from "../lib/queries";

// Wymusza dynamiczne renderowanie
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PriceList() {
  const timestamp = new Date().toISOString();
  console.log("PriceList rendered at:", timestamp);

  try {
    const data = await getData(getPriceList, { cache: "no-store" });
    const priceList = data?.currentPriceLists2?.[0]?.priceList2;
    console.log("PriceList:", priceList);

    // Jeśli brak cennika, nie renderuj
    if (!priceList || priceList.length === 0) {
      return (
        <div className="container max-w-5xl py-4">
          <p className="text-center text-gray-500">
            Cennik chwilowo niedostępny. Prosimy o kontakt telefoniczny.
          </p>
        </div>
      );
    }

    return (
      <div className="container max-w-5xl py-4">
        <table className="w-full table-fixed rounded-t-lg border-collapse">
          <thead>
            <tr className="font-bold text-white">
              <th className="rounded-tl-lg border-r border-slate-200 bg-blue-500 px-4 py-2 text-right">
                Produkt
              </th>
              <th className="rounded-tr-lg border-slate-200 bg-blue-500 px-4 py-2 text-left">
                Cena
              </th>
            </tr>
          </thead>
          <tbody>
            {priceList.map((product) => (
              <tr key={product.id} className="even:bg-slate-100">
                <td className="border-y border-r border-slate-200 px-4 py-2 text-right font-light">
                  {product.name}
                </td>
                <td className="border-y border-slate-200 px-4 py-2 font-bold">
                  {product.price}{" "}
                  <span className="text-sm font-light">zł/kg</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Informacja o cenach */}
        {/* <p className="mt-4 text-center text-sm text-gray-600">
          Ceny są aktualizowane codziennie i mogą ulec zmianie.
          <br />
          Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
        </p> */}
      </div>
    );
  } catch (error) {
    console.error("Error loading price list:", error);
    return (
      <div className="container max-w-5xl py-4">
        <p className="text-center text-red-600">
          Nie udało się załadować cennika. Prosimy spróbować ponownie później.
        </p>
      </div>
    );
  }
}
