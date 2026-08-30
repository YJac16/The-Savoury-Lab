import { orderUrl } from "@/lib/site";
import type { ExtraRow, MenuSection as MenuSectionData } from "@/lib/menu";
import { WhatsAppLink } from "@/components/WhatsAppLink";

function packLabel(qty: string) {
  return `${qty}`;
}

const priceLinkClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 font-medium tabular-nums text-brand underline-offset-4 focus-visible:text-accent focus-visible:underline";

export function MenuSection({ section }: { section: MenuSectionData }) {
  return (
    <article id={section.id} className="scroll-mt-28">
      <header className="mb-4 border-b border-brand/10 pb-3">
        <h3 className="text-2xl">{section.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{section.minimum}</p>
      </header>
      <p className="mb-2 text-xs text-ink-muted md:sr-only">
        Swipe sideways to see all pack prices.
      </p>
      <div className="menu-table-scroll -mx-5 overflow-x-auto overscroll-x-contain px-5 sm:mx-0 sm:px-0">
        <div className="rounded-sm border border-neutral-muted shadow-soft">
          <table className="w-full min-w-max border-collapse text-left text-sm">
            <caption className="sr-only">
              {section.title} prices. {section.minimum}. Tap a price to order on
              WhatsApp.
            </caption>
            <thead>
              <tr className="bg-brand text-brand-inverse">
                <th
                  scope="col"
                  className="menu-table-sticky-col bg-brand px-4 py-3 font-medium"
                >
                  Filling
                </th>
                {section.columns.map((column) => (
                  <th
                    key={column.qty}
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, index) => {
                const rowBg = index % 2 === 1 ? "bg-neutral" : "bg-brand-inverse";
                return (
                  <tr key={row.orderName} className={rowBg}>
                    <th
                      scope="row"
                      className={`menu-table-sticky-col px-4 py-2 font-medium ${rowBg}`}
                    >
                      {row.name}
                    </th>
                    {row.prices.map((price, priceIndex) => {
                      const qty = section.columns[priceIndex]?.qty ?? "";
                      return (
                        <td key={`${row.orderName}-${qty}`} className="px-2 py-1 text-right">
                          <WhatsAppLink
                            href={orderUrl(row.orderName, packLabel(qty))}
                            className={priceLinkClass}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}

export function ExtrasSection({ extras }: { extras: ExtraRow[] }) {
  return (
    <article id="extras" className="scroll-mt-28">
      <header className="mb-4 border-b border-brand/10 pb-3">
        <h3 className="text-2xl">Extras</h3>
      </header>
      <div className="menu-table-scroll -mx-5 overflow-x-auto overscroll-x-contain px-5 sm:mx-0 sm:px-0">
        <div className="rounded-sm border border-neutral-muted shadow-soft">
          <table className="w-full min-w-max border-collapse text-left text-sm">
            <caption className="sr-only">
              Extra pastry items. Tap a price to order on WhatsApp.
            </caption>
            <thead>
              <tr className="bg-brand text-brand-inverse">
                <th scope="col" className="px-4 py-3 font-medium">
                  Item
                </th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {extras.map((item, index) => (
                <tr
                  key={item.name}
                  className={index % 2 === 1 ? "bg-neutral" : "bg-brand-inverse"}
                >
                  <th scope="row" className="px-4 py-3.5 font-medium">
                    {item.name}
                  </th>
                  <td className="px-2 py-1 text-right">
                    <WhatsAppLink
                      href={orderUrl(item.name, item.pack)}
                      className={priceLinkClass}
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
      </div>
    </article>
  );
}
