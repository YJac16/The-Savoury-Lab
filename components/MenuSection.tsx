import { orderUrl } from "@/lib/site";
import type { ExtraRow, MenuSection as MenuSectionData } from "@/lib/menu";
import { WhatsAppLink } from "@/components/WhatsAppLink";

function packLabel(qty: string) {
  return `${qty}`;
}

export function MenuSection({ section }: { section: MenuSectionData }) {
  return (
    <article id={section.id} className="scroll-mt-24">
      <header className="mb-3 border-b-2 border-ink pb-2">
        <h3 className="text-lg font-semibold tracking-wide uppercase">
          {section.title}
        </h3>
        <p className="mt-1 text-sm text-mute">{section.minimum}</p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            {section.title} prices. {section.minimum}. Tap a price to order on
            WhatsApp.
          </caption>
          <thead>
            <tr className="bg-ink text-paper">
              <th scope="col" className="px-3 py-2.5 font-medium">
                Filling
              </th>
              {section.columns.map((column) => (
                <th
                  key={column.qty}
                  scope="col"
                  className="px-3 py-2.5 text-right font-medium tabular-nums"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, index) => (
              <tr
                key={row.orderName}
                className={index % 2 === 1 ? "bg-stripe" : "bg-paper"}
              >
                <th scope="row" className="px-3 py-3 font-medium">
                  {row.name}
                </th>
                {row.prices.map((price, priceIndex) => {
                  const qty = section.columns[priceIndex]?.qty ?? "";
                  return (
                    <td key={`${row.orderName}-${qty}`} className="px-3 py-3 text-right">
                      <WhatsAppLink
                        href={orderUrl(row.orderName, packLabel(qty))}
                        className="inline-block min-h-11 min-w-11 py-2 font-medium tabular-nums underline-offset-4 hover:underline"
                      >
                        {price}
                        <span className="sr-only">
                          {` — order ${row.orderName}, pack of ${qty}, on WhatsApp`}
                        </span>
                      </WhatsAppLink>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export function ExtrasSection({ extras }: { extras: ExtraRow[] }) {
  return (
    <article id="extras" className="scroll-mt-24">
      <header className="mb-3 border-b-2 border-ink pb-2">
        <h3 className="text-lg font-semibold tracking-wide uppercase">Extras</h3>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[16rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Extra pastry items. Tap a price to order on WhatsApp.
          </caption>
          <thead>
            <tr className="bg-ink text-paper">
              <th scope="col" className="px-3 py-2.5 font-medium">
                Item
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {extras.map((item, index) => (
              <tr
                key={item.name}
                className={index % 2 === 1 ? "bg-stripe" : "bg-paper"}
              >
                <th scope="row" className="px-3 py-3 font-medium">
                  {item.name}
                </th>
                <td className="px-3 py-3 text-right">
                  <WhatsAppLink
                    href={orderUrl(item.name, item.pack)}
                    className="inline-block min-h-11 min-w-11 py-2 font-medium tabular-nums underline-offset-4 hover:underline"
                  >
                    {item.price}
                    <span className="sr-only">
                      {` — order ${item.name} on WhatsApp`}
                    </span>
                  </WhatsAppLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
