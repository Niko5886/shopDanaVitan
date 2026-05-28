import { z } from "zod";

export const checkoutSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Името трябва да е поне 2 символа")
      .max(50, "Името е твърде дълго"),

    lastName: z
      .string()
      .min(2, "Фамилията трябва да е поне 2 символа")
      .max(50, "Фамилията е твърде дълга"),

    email: z.string().email("Въведете валиден имейл адрес"),

    phone: z
      .string()
      .regex(/^08[0-9]{8}$/, "Въведете валиден БГ номер (08XXXXXXXX)"),

    courier: z.enum(["econt", "speedy"], {
      error: "Моля, изберете куриер",
    }),

    deliveryType: z.enum(["address", "office"], {
      error: "Моля, изберете тип доставка",
    }),

    city: z.string().optional(),
    street: z.string().optional(),
    streetNumber: z.string().optional(),
    officeId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryType === "address") {
      if (!data.city || data.city.length < 2) {
        ctx.addIssue({ code: "custom", path: ["city"], message: "Въведете град" });
      }
      if (!data.street || data.street.length < 2) {
        ctx.addIssue({ code: "custom", path: ["street"], message: "Въведете улица" });
      }
      if (!data.streetNumber) {
        ctx.addIssue({ code: "custom", path: ["streetNumber"], message: "Въведете номер" });
      }
    }
    if (data.deliveryType === "office") {
      if (!data.officeId) {
        ctx.addIssue({ code: "custom", path: ["officeId"], message: "Моля, изберете офис" });
      }
    }
  });

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const ECONT_OFFICES = [
  { id: "e1", label: "Еконт — София, бул. Витоша 100" },
  { id: "e2", label: "Еконт — София, кв. Люлин, бул. Европа 45" },
  { id: "e3", label: "Еконт — Пловдив, ул. Иван Вазов 12" },
  { id: "e4", label: "Еконт — Варна, бул. Осми Приморски полк 55" },
  { id: "e5", label: "Еконт — Бургас, ул. Александровска 30" },
];

export const SPEEDY_OFFICES = [
  { id: "s1", label: "Speedy — София, ул. Раковски 15" },
  { id: "s2", label: "Speedy — София, кв. Младост 1, бл. 101" },
  { id: "s3", label: "Speedy — Пловдив, бул. България 88" },
  { id: "s4", label: "Speedy — Варна, ул. Дръзки 7" },
  { id: "s5", label: "Speedy — Бургас, ул. Богориди 22" },
];
