import { NextResponse } from "next/server";
import { storeConfig } from "@/lib/store";
import { isYocoConfigured } from "@/lib/yoco";

export async function GET() {
  return NextResponse.json({
    store: {
      name: storeConfig.name,
      tagline: storeConfig.tagline,
      location: storeConfig.location,
      phoneDisplay: storeConfig.phoneDisplay,
      instagram: storeConfig.instagram,
      instagramUrl: storeConfig.instagramUrl,
      halaal: storeConfig.halaal,
      notes: storeConfig.notes,
    },
    payments: {
      yocoReady: isYocoConfigured(),
      provider: "yoco",
    },
  });
}
