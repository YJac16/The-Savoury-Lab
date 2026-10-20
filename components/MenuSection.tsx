import { orderUrl } from "@/lib/site";
import type { ExtraRow, MenuSection as MenuSectionData } from "@/lib/menu";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const priceLinkClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 font-medium tabular-nums text-brand underline-offset-4 focus-visible:text-accent focus-visible:underline";

function PackOrderLink({
  href,
  pack,
  price,
  label,
}: {
  href: string;
  pack: string;
  price: string;
  label: string;
}) {
  return (
    <WhatsAppLink href={href} className="menu-pack-link">
      <span>{label}</span>
      <span className="tabular-nums">{price}</span>
      <span className="sr-only">{`Order ${pack} on WhatsApp.`}</span>
    </WhatsAppLink>
  );
}

function packButtonLabel(qty: string) {
  return /^\d+$/.test(qty) ? `Pack of ${qty}` : qty;
}

export function MenuSection({ section }: { section: MenuSectionData }) {
  return (
    <article id={section.id} className="menu-anchor">
      <header className="mb-4 border-b border-brand/10 pb-3">
        <h3 className="text-2xl">{section.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{section.minimum}</p>
      </header>

      <ul className="space-y-4 min-[431px]:hidden">
        {section.rows.map((row) => (
          <li key={row.orderName} className="border border-neutral-muted bg-brand-inverse p-4">
            <h4 className="text-xl">{row.name}</h4>
            <ul className="mt-3 space-y-2">
              {row.prices.map((price, priceIndex) => {
                const qty = section.columns[priceIndex]?.qty ?? "";
                return (
                  <li key={`${row.orderName}-${qty}`}>
                    <PackOrderLink
                      href={orderUrl({
                        product: section.title,
                        filling: row.name,
                        pack: qty,
                        price,
                      })}
                      pack={qty}
                      price={price}
                      label={packButtonLabel(qty)}
                    />
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      <p className="mb-2 hidden text-xs text-ink-muted min-[431px]:block md:sr-only">
        Swipe sideways to see all pack prices.
      </p>
      <div className="menu-table-scroll -mx-5 hidden overflow-x-auto overscroll-x-contain px-5 min-[431px]:block sm:mx-0 sm:px-0">
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
                            href={orderUrl({
                              product: section.title,
                              filling: row.name,
                              pack: qty,
                              price,
                            })}
                            className={priceLinkClass}
                          >
                            {price}
                            <span className="sr-only">
                              {` — order ${section.title}, ${row.name}, pack size ${qty}, ${price}, on WhatsApp`}
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
    <article id="extras" className="menu-anchor">
      <header className="mb-4 border-b border-brand/10 pb-3">
        <h3 className="text-2xl">Extras</h3>
        <p className="mt-1 text-sm text-ink-muted">
          Pastry is priced per kilogram. Samoosa leaves are priced per 100
          sheets.
        </p>
      </header>

      <ul className="space-y-4">
        {extras.map((item) => (
          <li
            id={item.id}
            key={item.id}
            className="menu-anchor border border-neutral-muted bg-brand-inverse p-4"
          >
            <h4 className="text-xl">{item.name}</h4>
            <p className="mt-1 text-sm text-ink-muted">
              {item.pack} · {item.unit}
            </p>
            <div className="mt-3">
              <PackOrderLink
                href={orderUrl({
                  product: item.name,
                  pack: item.pack,
                  price: item.price,
                })}
                pack={item.pack}
                price={item.price}
                label={item.pack}
              />
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
