import { NextRequest, NextResponse } from "next/server";
import { getOfficesByCity as getSpeedyOffices } from "@/lib/speedy-offices";
import { getEcontOfficesByCity } from "@/lib/econt-offices";

export type NormalizedOffice = {
  id: string;
  name: string;
  address: string;
};

export async function GET(req: NextRequest) {
  const courier = req.nextUrl.searchParams.get("courier");
  const city = req.nextUrl.searchParams.get("city");

  if (!city) {
    return NextResponse.json({ success: false, offices: [], error: "missing city" });
  }

  if (courier === "econt") {
    const offices = getEcontOfficesByCity(city).map((o) => ({
      id: o.id,
      name: o.name,
      address: o.address,
    }));
    return NextResponse.json({ success: true, offices });
  }

  if (courier === "speedy") {
    const offices = getSpeedyOffices(city).map((o) => ({
      id: o.id,
      name: o.name,
      address: o.address,
    }));
    return NextResponse.json({ success: true, offices });
  }

  return NextResponse.json({ success: false, offices: [], error: "unknown courier" });
}
