// ═══════ BARBER DATA & AVAILABILITY ═══════
// Central source of truth for all barber info and mock schedules.

export interface Barber {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  image: string;
  rating: number;
  yearsExp: number;
}

export interface TimeSlot {
  time: string;     // "10:00", "11:00", etc.
  label: string;    // "10:00 AM", "11:00 AM", etc.
}

// All available working hour slots (10 AM – 8 PM)
export const TIME_SLOTS: TimeSlot[] = [
  { time: "10:00", label: "10:00 AM" },
  { time: "11:00", label: "11:00 AM" },
  { time: "12:00", label: "12:00 PM" },
  { time: "13:00", label: "1:00 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "15:00", label: "3:00 PM" },
  { time: "16:00", label: "4:00 PM" },
  { time: "17:00", label: "5:00 PM" },
  { time: "18:00", label: "6:00 PM" },
  { time: "19:00", label: "7:00 PM" },
  { time: "20:00", label: "8:00 PM" },
];

// All barbers
export const BARBERS: Barber[] = [
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    title: "Lead Barber",
    specialty: "Fades & Scissor Work",
    bio: "Marcus has been cutting hair for over 8 years. Known for his precise fades and clean lineups, he's the guy you go to when you want to look sharp for something important. No shortcuts, just quality.",
    image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    yearsExp: 8,
  },
  {
    id: "julian-rossi",
    name: "Julian Rossi",
    title: "Senior Barber",
    specialty: "Classic Cuts & Beard Sculpting",
    bio: "Julian brings old-school technique with a modern edge. If you want a classic gentleman's cut or a perfectly sculpted beard, he's your guy. Every cut is a conversation about your style.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    yearsExp: 6,
  },
  {
    id: "david-chen",
    name: "David Chen",
    title: "Senior Barber",
    specialty: "Textured Crops & Color",
    bio: "David is the creative one. He's always up on the latest trends and knows how to make them work for your face. Color work, textures, and anything experimental — that's his lane.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    yearsExp: 5,
  },
  {
    id: "andre-smith",
    name: "Andre Smith",
    title: "Barber",
    specialty: "Clean Fades & Lineups",
    bio: "Andre specializes in making your fade look effortless. Quick, precise, and always consistent. He's built a loyal following because he delivers every single time.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    yearsExp: 4,
  },
  {
    id: "sam-wilson",
    name: "Sam Wilson",
    title: "Barber",
    specialty: "Tapers & Quick Cuts",
    bio: "Sam is fast and efficient without cutting corners. Need a clean taper or a quick shape-up before an event? He'll get you in and out looking fresh.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    yearsExp: 3,
  },
];

// ═══════ MOCK BUSY SCHEDULE ═══════
// Maps barber ID → date string → array of busy time slots
// In a real app this would come from a database.

type BusySchedule = Record<string, Record<string, string[]>>;

// Generate "today" and next 7 days as date strings
function getDateString(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

// Build a deterministic mock schedule based on barber index
function buildMockSchedule(): BusySchedule {
  const schedule: BusySchedule = {};

  BARBERS.forEach((barber, barberIdx) => {
    schedule[barber.id] = {};

    for (let day = 0; day <= 14; day++) {
      const dateStr = getDateString(day);
      const busySlots: string[] = [];

      // Deterministic "busy" slots: use barber index + day to seed
      const seed = barberIdx * 7 + day;
      TIME_SLOTS.forEach((slot, slotIdx) => {
        // Each barber is busy at ~3-4 slots per day
        if ((seed + slotIdx * 3) % 5 === 0 || (seed + slotIdx * 2) % 7 === 0) {
          busySlots.push(slot.time);
        }
      });

      schedule[barber.id][dateStr] = busySlots;
    }
  });

  return schedule;
}

const BUSY_SCHEDULE = buildMockSchedule();

// ═══════ HELPERS ═══════

export function getAllBarbers(): Barber[] {
  return BARBERS;
}

export function getBarberById(id: string): Barber | undefined {
  return BARBERS.find((b) => b.id === id);
}

export function getBarberByName(name: string): Barber | undefined {
  return BARBERS.find((b) => b.name === name);
}

/**
 * Returns array of busy time strings (e.g. ["10:00", "14:00"]) 
 * for a given barber on a given date.
 */
export function getBusySlots(barberId: string, date: string): string[] {
  return BUSY_SCHEDULE[barberId]?.[date] || [];
}

/**
 * Check if a specific barber is busy at a specific time on a date.
 */
export function isBarberBusy(barberId: string, date: string, time: string): boolean {
  const busy = getBusySlots(barberId, date);
  return busy.includes(time);
}
