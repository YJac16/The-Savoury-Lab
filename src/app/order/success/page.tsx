import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order received",
};

type Props = {
  searchParams: Promise<{ id?: string; wa?: string; yoco?: string }>;
};

export default async function OrderSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const id = params.id || "your order";
  const wa = params.wa;
  const yoco = params.yoco;

  return (
    <div className="section">
      <div className="success-panel">
        <p className="halaal-pill">Order placed</p>
        <h1>Thanks — {id}</h1>
        <p>
          Your order details are ready. Send them on WhatsApp so we can confirm
          collection
          {yoco ? ", or pay now with your Yoco link" : ""}.
        </p>

        <div className="success-actions">
          {wa ? (
            <a className="btn btn-whatsapp" href={wa} target="_blank" rel="noreferrer">
              Send on WhatsApp
            </a>
          ) : null}
          {yoco ? (
            <a className="btn btn-yoco" href={yoco} target="_blank" rel="noreferrer">
              Pay with Yoco
            </a>
          ) : null}
          <Link className="btn btn-secondary" href="/menu">
            Back to menu
          </Link>
        </div>

        {!yoco ? (
          <p style={{ marginTop: "1.5rem", color: "var(--ink-soft)" }}>
            Yoco is wired up and waiting — add{" "}
            <code>NEXT_PUBLIC_YOCO_PAYMENT_LINK</code> in Vercel when you have
            your link.
          </p>
        ) : null}
      </div>
    </div>
  );
}
