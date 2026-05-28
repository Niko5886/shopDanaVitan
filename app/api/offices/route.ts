import { NextRequest, NextResponse } from "next/server";
import { SPEEDY_OFFICES } from "@/lib/speedy-offices";

export type NormalizedOffice = {
  id: string;
  address: string;
};

type EcontCity = {
  id: number;
  name: string;
  nameEn?: string;
};

type EcontOffice = {
  id: number;
  name: string;
  address?: {
    fullAddress?: string;
  };
};

// Кешираме списъка с градове за Еконт в module scope —
// нов request през Next.js dev сървъра ще ползва същия кеш.
let econtCitiesCache: EcontCity[] | null = null;

async function getEcontCities(): Promise<EcontCity[]> {
  if (econtCitiesCache) return econtCitiesCache;
  const res = await fetch(
    "https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getCities.json",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ countryCode: "BGR" }),
      // По подразбиране Next кешира — не искаме старо съдържание
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("getCities failed");
  const data: { cities?: EcontCity[] } = await res.json();
  econtCitiesCache = data.cities ?? [];
  return econtCitiesCache;
}

async function getEcontOfficesForCity(cityName: string): Promise<NormalizedOffice[]> {
  const cities = await getEcontCities();
  const match = cities.find((c) => c.name === cityName);
  if (!match) return [];

  const res = await fetch(
    "https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ countryCode: "BGR", cityID: match.id }),
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("getOffices failed");
  const data: { offices?: EcontOffice[] } = await res.json();
  return (data.offices ?? []).map((o) => ({
    id: `econt-${o.id}`,
    address: o.address?.fullAddress ?? o.name,
  }));
}

function getSpeedyOfficesForCity(cityName: string): NormalizedOffice[] {
  return SPEEDY_OFFICES.filter((o) => o.city === cityName).map((o) => ({
    id: o.id,
    address: `${o.address} · ${o.workingHours}`,
  }));
}

export async function GET(req: NextRequest) {
  const courier = req.nextUrl.searchParams.get("courier");
  const city = req.nextUrl.searchParams.get("city");

  if (!city) {
    return NextResponse.json({ success: false, offices: [], error: "missing city" });
  }

  if (courier === "econt") {
    try {
      const offices = await getEcontOfficesForCity(city);
      return NextResponse.json({ success: true, offices });
    } catch (e) {
      console.error("[api/offices] econt error", e);
      return NextResponse.json({ success: false, offices: [] });
    }
  }

  if (courier === "speedy") {
    return NextResponse.json({ success: true, offices: getSpeedyOfficesForCity(city) });
  }

  return NextResponse.json({ success: false, offices: [], error: "unknown courier" });
}
