"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  Clock,
  Scissors,
  Star,
  User,
  AlertTriangle,
} from "lucide-react";
import {
  getBarberById,
  getBusySlots,
  TIME_SLOTS,
  type Barber,
} from "../../../../lib/barberData";
import Footer from "../../../../components/Footer";

// ═══════ TIME SLOT PICKER (for barber page — busy = disabled) ═══════
function TimeSlotPicker({
  barberId,
  selectedDate,
  selectedTime,
  onSelectTime,
}: {
  barberId: string;
  selectedDate: string;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}) {
  const busySlots = useMemo(
    () => (selectedDate ? getBusySlots(barberId, selectedDate) : []),
    [barberId, selectedDate]
  );

  if (!selectedDate) {
    return (
      <div className="text-center py-8 border border-white/5">
        <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-2" />
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold">
          Select a date first
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
        Available Times
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {TIME_SLOTS.map((slot) => {
          const isBusy = busySlots.includes(slot.time);
          const isSelected = selectedTime === slot.time;

          return (
            <button
              key={slot.time}
              type="button"
              disabled={isBusy}
              onClick={() => onSelectTime(slot.time)}
              className={`
                py-3 text-[11px] uppercase tracking-[0.15em] font-semibold border transition-all duration-300
                ${
                  isBusy
                    ? "border-white/5 text-gray-700 bg-white/[0.01] cursor-not-allowed line-through"
                    : isSelected
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white hover:border-white/30 hover:bg-white/[0.03]"
                }
              `}
            >
              {slot.label}
              {isBusy && (
                <span className="block text-[8px] tracking-wider text-gray-700 mt-0.5 no-underline" style={{ textDecoration: "none" }}>
                  OFF
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════ SERVICES ═══════
const SERVICES = [
  { _id: "1", name: "The Clean Fade", price: 45 },
  { _id: "2", name: "Textured Crop", price: 40 },
  { _id: "3", name: "Buzz & Beard", price: 55 },
  { _id: "4", name: "The Full Send", price: 85 },
  { _id: "5", name: "Color Drop", price: 120 },
  { _id: "6", name: "Lineup Only", price: 25 },
];

// ═══════ BARBER DETAIL PAGE ═══════
export default function BarberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const barberId = params.id as string;
  const barber = getBarberById(barberId);

  const [formData, setFormData] = useState({
    name: "",
    serviceId: "",
    date: "",
    time: "",
  });
  const [bookingStatus, setBookingStatus] = useState("");

  if (!barber) {
    return (
      <main className="bg-black min-h-screen flex items-center justify-center text-white">
        <div className="text-center space-y-6">
          <User className="w-12 h-12 text-gray-600 mx-auto" />
          <h2 className="text-3xl font-bold uppercase">
            BARBER <span className="text-gray-500">NOT FOUND</span>
          </h2>
          <Link
            href="/barbers"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-all"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Barbers
          </Link>
        </div>
      </main>
    );
  }

  // Get today's date as min for the date picker
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName =
      SERVICES.find((s) => s._id === formData.serviceId)?.name || "Service";
    setBookingStatus("Locking in...");
    setTimeout(() => {
      setBookingStatus(
        `Confirmed: ${serviceName} with ${barber.name} at ${
          TIME_SLOTS.find((s) => s.time === formData.time)?.label
        }.`
      );
    }, 1500);
  };

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/barbers"
          className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-[0.2em] transition-colors group"
        >
          <ChevronLeft
            size={12}
            className="group-hover:-translate-x-1 transition-transform"
          />
          All Barbers
        </Link>
      </div>

      {/* Profile Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Photo + Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden border border-white/10 mb-8">
              <img
                src={barber.image}
                alt={barber.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.round(barber.rating)
                          ? "fill-white text-white"
                          : "fill-transparent text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-300 ml-1">
                    {barber.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block mb-2">
                  {barber.title}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold uppercase leading-[0.95]">
                  {barber.name.split(" ")[0]}
                  <br />
                  <span className="text-gray-500">
                    {barber.name.split(" ").slice(1).join(" ")}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                  <Scissors className="w-3 h-3" />
                  {barber.specialty}
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                  <Clock className="w-3 h-3" />
                  {barber.yearsExp}+ years
                </div>
              </div>

              <div className="w-12 h-px bg-white/10 my-4" />

              <p className="text-gray-400 font-light leading-relaxed text-sm max-w-lg">
                {barber.bio}
              </p>
            </div>
          </motion.div>

          {/* Right — Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="border border-white/10 p-8 md:p-10 space-y-8 sticky top-28">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold uppercase">
                  BOOK WITH{" "}
                  <span className="text-gray-500">
                    {barber.name.split(" ")[0]}
                  </span>
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold">
                  Choose your service, date and time
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-colors font-light appearance-none text-sm"
                  />
                  <label className="absolute left-0 top-3 text-[10px] uppercase tracking-[0.2em] text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-3 font-semibold">
                    Your Name
                  </label>
                </div>

                {/* Service */}
                <div className="relative">
                  <select
                    required
                    value={formData.serviceId}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceId: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-colors font-light appearance-none cursor-pointer text-sm"
                  >
                    <option value="" disabled className="bg-black">
                      Select Service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s._id} value={s._id} className="bg-black">
                        {s.name} — ${s.price}
                      </option>
                    ))}
                  </select>
                  <Scissors className="absolute right-0 bottom-3 w-3 h-3 text-white/30 pointer-events-none" />
                </div>

                {/* Barber (locked) */}
                <div className="border border-white/5 bg-white/[0.02] p-4 flex items-center gap-4">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-10 h-10 object-cover border border-white/10 grayscale"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{barber.name}</p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em]">
                      {barber.title} • Pre-selected
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                {/* Date */}
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                        time: "",
                      })
                    }
                    className="w-full bg-transparent border border-white/10 py-3 px-4 text-white focus:outline-none focus:border-white/30 transition-colors font-light appearance-none [color-scheme:dark] text-sm"
                  />
                </div>

                {/* Time Slots */}
                <TimeSlotPicker
                  barberId={barber.id}
                  selectedDate={formData.date}
                  selectedTime={formData.time}
                  onSelectTime={(time) => setFormData({ ...formData, time })}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!formData.name || !formData.serviceId || !formData.date || !formData.time}
                  className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-all duration-500 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>

                {bookingStatus && (
                  <div className="text-center space-y-1 mt-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white animate-pulse font-semibold">
                      {bookingStatus}
                    </p>
                    {bookingStatus.includes("Confirmed") && (
                      <p className="text-[10px] text-gray-500 tracking-wider">
                        See you soon! ✌️
                      </p>
                    )}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
