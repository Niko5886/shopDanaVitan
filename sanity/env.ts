// Чете Sanity променливите от .env.local.
// Ако някоя липсва — хвърляме разбираема грешка още при стартиране,
// вместо неясни проблеми по-късно при заявките.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Липсва променливата NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Липсва променливата NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
