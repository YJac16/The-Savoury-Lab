import { NextResponse } from "next/server";
import { z } from "zod";
import { createOrder } from "@/lib/orders";

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(7),
    email: z.string().email().optional().or(z.literal("")),
    notes: z.string().optional(),
    preferredCollection: z.string().optional(),
  }),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid order", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const customer = {
      ...parsed.data.customer,
      email: parsed.data.customer.email || undefined,
    };

    const order = await createOrder(parsed.data.items, customer);
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create order";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
