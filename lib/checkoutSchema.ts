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
