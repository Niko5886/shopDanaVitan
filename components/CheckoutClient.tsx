"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  checkoutSchema,
  type CheckoutFormData,
  ECONT_OFFICES,
  SPEEDY_OFFICES,
} from "../lib/checkoutSchema";
import { products } from "../data/products";

const inputClass =
  "w-full rounded bg-[#111111] border border-[#333333] text-white text-sm px-4 py-3 placeholder:text-[#666666] transition-all duration-200 focus:outline-none focus:border-[#8B1A2F] focus:ring-2 focus:ring-[#8B1A2F]/20";

const labelClass =
  "block text-xs uppercase tracking-[0.08em] text-[#999999] mb-1.5";

const errorClass = "mt-1 text-xs text-[#E53935]";

export default function CheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("product") ?? "";
  const size = searchParams.get("size") ?? "";
  const price = searchParams.get("price") ?? "";

  const product = products.find((p) => p.id === productId);
  const productImage = product?.thumb ?? product?.images?.[0] ?? null;

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
  });

  const courier = watch("courier");
  const deliveryType = watch("deliveryType");

  const offices = courier === "econt" ? ECONT_OFFICES : courier === "speedy" ? SPEEDY_OFFICES : [];

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, product: productId, size, price }),
      });
      const json = await res.json();
      if (json.success) {
        sessionStorage.setItem("orderComplete", "true");
        router.push("/order-success");
      } else {
        setSubmitError("Възникна грешка. Моля, опитайте отново.");
      }
    } catch {
      setSubmitError("Възникна грешка. Моля, опитайте отново.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 pb-20 pt-24 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[38fr_62fr]">
          {/* ── ЛЯВА КОЛОНА — Обобщение ── */}
          <aside>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1A2F]">
              Вашата поръчка
            </h2>

            <div className="rounded border border-[#8B1A2F] bg-[#111111] p-5">
              <div className="flex gap-4">
                <div className="relative h-[120px] w-[120px] flex-shrink-0 overflow-hidden rounded bg-black">
                  {productImage ? (
                    <Image src={productImage} alt={product?.title ?? "Продукт"} fill className="object-cover" sizes="120px" />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#8B1A2F,#1a0d10_58%,#000)]" />
                  )}
                </div>
                <div className="flex flex-col justify-center text-sm">
                  <p className="text-white/60">
                    Артикул: <span className="text-white">{product?.title ?? "—"}</span>
                  </p>
                  <p className="mt-1 text-white/60">
                    Размер: <span className="text-white">{size || "—"}</span>
                  </p>
                  <p className="mt-1 text-white/60">
                    Цена: <span className="text-white">{price || "—"}</span>
                  </p>
                </div>
              </div>

              <hr className="my-4 border-t border-white/10" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Доставка:</span>
                <span className="text-white">по договаряне с куриер</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-white/70">ОБЩО:</span>
                <span className="text-lg font-bold text-[#8B1A2F]">{price || "—"}</span>
              </div>
            </div>

            <p className="mt-3 text-xs italic text-white/50">
              * Точната цена за доставка се уточнява след потвърждение.
            </p>
          </aside>

          {/* ── ДЯСНА КОЛОНА — Форма ── */}
          <section>
            <h1 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Данни за доставка
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              {/* Лични данни */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>Име*</label>
                  <input id="firstName" type="text" {...register("firstName")} className={inputClass} placeholder="Иван" />
                  {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>Фамилия*</label>
                  <input id="lastName" type="text" {...register("lastName")} className={inputClass} placeholder="Иванов" />
                  {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>Имейл*</label>
                  <input id="email" type="email" {...register("email")} className={inputClass} placeholder="primer@email.bg" />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Телефон*</label>
                  <input id="phone" type="tel" {...register("phone")} className={inputClass} placeholder="08XXXXXXXX" />
                  {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                </div>
              </div>

              {/* Куриер */}
              <div>
                <p className={labelClass}>Куриер</p>
                <div className="grid grid-cols-2 gap-3">
                  {(["econt", "speedy"] as const).map((c) => {
                    const isSel = courier === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setValue("courier", c, { shouldValidate: true })}
                        className={`flex flex-col items-start gap-1 rounded p-4 text-left transition-all duration-200 ${
                          isSel
                            ? "border-2 border-[#8B1A2F] bg-[#8B1A2F]/[0.08]"
                            : "border border-[#333333] bg-[#111111] hover:border-white/30"
                        }`}
                        aria-pressed={isSel ? "true" : "false"}
                      >
                        <span className="text-base">📦</span>
                        <span className="text-sm font-semibold uppercase tracking-wider text-white">
                          {c === "econt" ? "Еконт" : "Speedy"}
                        </span>
                        <span className="text-xs text-white/55">Бърза доставка</span>
                      </button>
                    );
                  })}
                </div>
                {/* hidden input for register */}
                <input type="hidden" {...register("courier")} />
                {errors.courier && <p className={errorClass}>{errors.courier.message}</p>}
              </div>

              {/* Тип доставка — show only after courier chosen */}
              {courier && (
                <div>
                  <p className={labelClass}>Тип доставка</p>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { v: "address", icon: "🏠", title: "До адрес", desc: "Доставяме до вас" },
                      { v: "office", icon: "🏢", title: "До офис", desc: "Вземете от офис" },
                    ] as const).map((opt) => {
                      const isSel = deliveryType === opt.v;
                      return (
                        <button
                          key={opt.v}
                          type="button"
                          onClick={() => setValue("deliveryType", opt.v, { shouldValidate: true })}
                          className={`flex flex-col items-start gap-1 rounded p-4 text-left transition-all duration-200 ${
                            isSel
                              ? "border-2 border-[#8B1A2F] bg-[#8B1A2F]/[0.08]"
                              : "border border-[#333333] bg-[#111111] hover:border-white/30"
                          }`}
                          aria-pressed={isSel ? "true" : "false"}
                        >
                          <span className="text-base">{opt.icon}</span>
                          <span className="text-sm font-semibold uppercase tracking-wider text-white">
                            {opt.title}
                          </span>
                          <span className="text-xs text-white/55">{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" {...register("deliveryType")} />
                  {errors.deliveryType && <p className={errorClass}>{errors.deliveryType.message}</p>}
                </div>
              )}

              {/* Адресни полета */}
              {deliveryType === "address" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="city" className={labelClass}>Град*</label>
                    <input id="city" type="text" {...register("city")} className={inputClass} placeholder="София" />
                    {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <div>
                      <label htmlFor="street" className={labelClass}>Улица*</label>
                      <input id="street" type="text" {...register("street")} className={inputClass} placeholder="ул. Витоша" />
                      {errors.street && <p className={errorClass}>{errors.street.message}</p>}
                    </div>
                    <div className="sm:w-32">
                      <label htmlFor="streetNumber" className={labelClass}>Номер*</label>
                      <input id="streetNumber" type="text" {...register("streetNumber")} className={inputClass} placeholder="12" />
                      {errors.streetNumber && <p className={errorClass}>{errors.streetNumber.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {deliveryType === "office" && (
                <div>
                  <label htmlFor="officeId" className={labelClass}>Изберете офис*</label>
                  <select id="officeId" {...register("officeId")} className={inputClass} defaultValue="">
                    <option value="" disabled>Изберете офис...</option>
                    {offices.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.officeId && <p className={errorClass}>{errors.officeId.message}</p>}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded bg-[#8B1A2F] py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-200 hover:bg-[#A52035] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#8B1A2F]"
              >
                {loading && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                )}
                {loading ? "Изпращане..." : "Изпрати поръчка"}
              </button>

              {submitError && (
                <p className="text-center text-sm text-[#E53935]" role="alert">
                  {submitError}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
