import { promises as fs } from "fs";
import path from "path";
import { getProductById, priceForQuantity } from "@/lib/products";
import { getWhatsAppOrderUrl, storeConfig } from "@/lib/store";
import { resolveYocoPaymentLink } from "@/lib/yoco";
import type { CartItem, Order, OrderCustomer, OrderLine } from "@/types";

const ORDERS_PATH = path.join(process.cwd(), "data", "orders.json");

function orderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TSL-${stamp}-${rand}`;
}

export function buildOrderLines(items: CartItem[]): OrderLine[] {
  const lines: OrderLine[] = [];

  for (const item of items) {
    const product = getProductById(item.productId);
    if (!product) {
      throw new Error(`Unknown product: ${item.productId}`);
    }
    const priced = priceForQuantity(product, item.quantity);
    if (!priced) {
      throw new Error(
        `${product.name} requires a minimum of ${product.minQuantity} ${product.unitLabel}`,
      );
    }
    lines.push({
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      unitPriceZar: priced.unitPriceZar,
      lineTotalZar: priced.lineTotalZar,
    });
  }

  return lines;
}

export function buildWhatsAppMessage(
  order: Pick<Order, "id" | "customer" | "lines" | "totalZar">,
): string {
  const lines = order.lines
    .map(
      (l) =>
        `• ${l.productName} × ${l.quantity} — R${l.lineTotalZar.toFixed(2)}`,
    )
    .join("\n");

  return [
    `Hi ${storeConfig.name}! I'd like to place an order.`,
    ``,
    `Order: ${order.id}`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    order.customer.email ? `Email: ${order.customer.email}` : "",
    order.customer.preferredCollection
      ? `Collection: ${order.customer.preferredCollection}`
      : "",
    ``,
    lines,
    ``,
    `Total: R${order.totalZar.toFixed(2)}`,
    order.customer.notes ? `\nNotes: ${order.customer.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function readOrders(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(ORDERS_PATH, "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(ORDERS_PATH), { recursive: true });
    await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf8");
  } catch {
    // On Vercel serverless, disk may be read-only outside /tmp — order still returns to client
  }
}

export async function createOrder(
  items: CartItem[],
  customer: OrderCustomer,
): Promise<Order> {
  if (!items.length) throw new Error("Cart is empty");

  const lines = buildOrderLines(items);
  const totalZar =
    Math.round(lines.reduce((sum, l) => sum + l.lineTotalZar, 0) * 100) / 100;

  const productsInOrder = items
    .map((i) => getProductById(i.productId))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const yocoPaymentLink = resolveYocoPaymentLink(productsInOrder);

  const draft = {
    id: orderId(),
    createdAt: new Date().toISOString(),
    customer,
    lines,
    totalZar,
  };

  const whatsappUrl = getWhatsAppOrderUrl(buildWhatsAppMessage(draft));

  const order: Order = {
    ...draft,
    status: yocoPaymentLink ? "pending_payment" : "awaiting_whatsapp",
    yocoPaymentLink,
    whatsappUrl,
  };

  const existing = await readOrders();
  existing.push(order);
  await writeOrders(existing);

  return order;
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const orders = await readOrders();
  return orders.find((o) => o.id === id);
}
