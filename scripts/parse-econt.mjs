// One-off парсер за еконтофиси.txt → econt-offices.ts
import { readFileSync, writeFileSync } from "node:fs";

const raw = readFileSync(new URL("../lib/еконтофиси.txt", import.meta.url), "utf8");
const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0 && l !== "marker");

// Известни сложни (двусловни) градове — за правилно извличане
const COMPOUND_CITIES = [
  "Велико Търново",
  "Стара Загора",
  "Нова Загора",
  "Горна Оряховица",
  "Долна Оряховица",
  "Бяла Слатина",
  "Бяла Черква",
  "Долни Дъбник",
  "Долни Чифлик",
  "Червен Бряг",
  "Полски Тръмбеш",
  "Велики Преслав",
  "Свети Влас",
  "Слънчев Бряг",
  "Златни Пясъци",
  "Нови Искър",
  "Нови Пазар",
  "Нови Хан",
  "Бяла",
];

function extractCity(addr) {
  for (const c of COMPOUND_CITIES) {
    if (addr.startsWith(c + " ") || addr === c) return c;
  }
  const m = addr.match(/^(\S+)/);
  return m ? m[1] : "";
}

// Лините идват по двойки: name, address
const offices = [];
let counter = 0;
for (let i = 0; i + 1 < lines.length; i += 2) {
  const name = lines[i];
  const address = lines[i + 1];

  // Скип на автомати/еконтомати — съответства на "(АВТОМАТ)" в Speedy.
  if (/(еконтомат|автомат|24\/7)/iu.test(name)) continue;

  // Защитна проверка: ако "address" не започва с главна буква (вероятно нов name),
  // парсингът се е разсинхронизирал. Опитваме се да възстановим.
  if (!/^[А-Я]/.test(address)) {
    i -= 1;
    continue;
  }

  const city = extractCity(address);
  if (!city) continue;

  counter += 1;
  offices.push({
    id: `econt-${counter}`,
    name,
    city,
    address,
  });
}

const cities = [...new Set(offices.map((o) => o.city))].sort((a, b) => a.localeCompare(b, "bg"));

const ts = `// Реални офиси на Еконт — само офиси (БЕЗ автомати/Еконтомати).
// Генериран автоматично от lib/еконтофиси.txt чрез scripts/parse-econt.mjs

export interface EcontOffice {
  id: string;
  name: string;
  city: string;
  address: string;
}

export const ECONT_OFFICES: EcontOffice[] = [
${offices
  .map(
    (o) =>
      `  { id: ${JSON.stringify(o.id)}, name: ${JSON.stringify(o.name)}, city: ${JSON.stringify(o.city)}, address: ${JSON.stringify(o.address)} },`,
  )
  .join("\n")}
];

export const ECONT_CITIES: string[] = [...new Set(ECONT_OFFICES.map((o) => o.city))].sort(
  (a, b) => a.localeCompare(b, "bg"),
);

export function getEcontOfficesByCity(city: string): EcontOffice[] {
  return ECONT_OFFICES.filter((o) => o.city === city);
}
`;

writeFileSync(new URL("../lib/econt-offices.ts", import.meta.url), ts, "utf8");
console.log(`Wrote ${offices.length} offices across ${cities.length} cities`);
