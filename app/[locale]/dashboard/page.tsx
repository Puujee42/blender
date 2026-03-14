"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Crown,
  LogOut,
  Scissors,
  Shield,
  TrendingUp,
  User,
  Users,
  ChevronDown,
  Star,
  ArrowRight,
  Loader2,
  CheckCircle,
} from "lucide-react";

type Role = "admin" | "barber" | "customer";

interface UserItem {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  role: Role;
  createdAt: number;
}

// ─── ROLE BADGE ───
function RoleBadge({ role }: { role: Role }) {
  const config = {
    admin: { icon: Crown, label: "Admin", cls: "text-white border-white/30 bg-white/5" },
    barber: { icon: Scissors, label: "Barber", cls: "text-white border-white/20 bg-white/5" },
    customer: { icon: User, label: "Customer", cls: "text-gray-400 border-white/10 bg-white/[0.02]" },
  };
  const { icon: Icon, label, cls } = config[role];
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 border text-[10px] uppercase tracking-[0.2em] font-bold ${cls}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}

// ─── STAT CARD ───
function StatCard({ icon: Icon, label, value, delay = 0 }: { icon: any; label: string; value: string | number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="border border-white/5 hover:border-white/20 p-8 group transition-all duration-500"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
          <Icon size={16} className="text-white" />
        </div>
      </div>
      <p className="text-4xl font-bold text-white mb-2">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">{label}</p>
    </motion.div>
  );
}

// ─── CUSTOMER DASHBOARD ───
function CustomerDashboard() {
  const appointments = [
    { service: "The Clean Fade", barber: "Marcus Johnson", date: "Mar 16", time: "2:00 PM", status: "Confirmed" },
    { service: "Buzz & Beard", barber: "Julian Rossi", date: "Mar 22", time: "11:00 AM", status: "Pending" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Calendar} label="Upcoming" value={2} delay={0.1} />
        <StatCard icon={Scissors} label="Total Visits" value={12} delay={0.2} />
        <StatCard icon={Star} label="Member Since" value="2024" delay={0.3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border border-white/5 p-8"
      >
        <h3 className="text-2xl font-bold mb-6 uppercase">
          Upcoming <span className="text-gray-500">Sessions</span>
        </h3>
        <div className="space-y-3">
          {appointments.map((apt, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 border border-white/5 hover:border-white/20 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
                  <Scissors size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{apt.service}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                    with {apt.barber}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white font-light">{apt.date}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{apt.time}</p>
              </div>
              <span
                className={`text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 border ${
                  apt.status === "Confirmed"
                    ? "text-white border-white/30"
                    : "text-gray-400 border-white/10"
                }`}
              >
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Link
          href="/#book"
          className="border border-white/5 p-8 group hover:border-white/20 transition-all duration-500 flex items-center justify-between"
        >
          <div>
            <h4 className="text-xl font-bold text-white group-hover:tracking-wider transition-all uppercase">
              Book Now
            </h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-2">
              Reserve your next session
            </p>
          </div>
          <ArrowRight size={20} className="text-white group-hover:translate-x-2 transition-transform" />
        </Link>
        <Link
          href="/barbers"
          className="border border-white/5 p-8 group hover:border-white/20 transition-all duration-500 flex items-center justify-between"
        >
          <div>
            <h4 className="text-xl font-bold text-white group-hover:tracking-wider transition-all uppercase">
              Our Barbers
            </h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-2">
              Meet the crew
            </p>
          </div>
          <ArrowRight size={20} className="text-white group-hover:translate-x-2 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}

// ─── BARBER DASHBOARD ───
function BarberDashboard() {
  const schedule = [
    { client: "Daniel Kim", service: "The Clean Fade", time: "10:00 AM", status: "In Progress" },
    { client: "Alex Chen", service: "Textured Crop", time: "11:30 AM", status: "Upcoming" },
    { client: "Michael Tran", service: "Buzz & Beard", time: "1:00 PM", status: "Upcoming" },
    { client: "Ryan Park", service: "The Full Send", time: "3:00 PM", status: "Upcoming" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Today's Clients" value={4} delay={0.1} />
        <StatCard icon={Users} label="This Week" value={18} delay={0.2} />
        <StatCard icon={TrendingUp} label="Earnings (Week)" value="$1,240" delay={0.3} />
        <StatCard icon={Star} label="Rating" value="4.9" delay={0.4} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border border-white/5 p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold uppercase">
            Today&apos;s <span className="text-gray-500">Schedule</span>
          </h3>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </span>
        </div>
        <div className="space-y-3">
          {schedule.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center justify-between p-5 border border-white/5 hover:border-white/20 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
                  <Clock size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.client}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">{item.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-sm text-white font-light">{item.time}</p>
                <span
                  className={`text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 border ${
                    item.status === "In Progress"
                      ? "text-white border-white/30 bg-white/5"
                      : "text-gray-400 border-white/10"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ───
function AdminDashboard() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (targetUserId: string, newRole: Role) => {
    setUpdatingId(targetUserId);
    setSuccessId(null);
    try {
      const res = await fetch(`/api/admin/users/${targetUserId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === targetUserId ? { ...u, role: newRole } : u))
        );
        setSuccessId(targetUserId);
        setTimeout(() => setSuccessId(null), 2000);
      }
    } catch (err) {
      console.error("Failed to update role:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    barbers: users.filter((u) => u.role === "barber").length,
    customers: users.filter((u) => u.role === "customer").length,
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={stats.total} delay={0.1} />
        <StatCard icon={Crown} label="Admins" value={stats.admins} delay={0.2} />
        <StatCard icon={Scissors} label="Barbers" value={stats.barbers} delay={0.3} />
        <StatCard icon={User} label="Customers" value={stats.customers} delay={0.4} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border border-white/5 p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold uppercase">
            User <span className="text-gray-500">Management</span>
          </h3>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            {stats.total} members
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-white" size={24} />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold border-b border-white/5">
              <div className="col-span-5">User</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {users.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="grid grid-cols-12 gap-4 items-center p-5 border border-white/5 hover:border-white/20 transition-colors group"
              >
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={u.imageUrl}
                    alt={u.name}
                    className="w-9 h-9 object-cover border border-white/10 group-hover:border-white/30 transition-colors"
                  />
                  <div>
                    <p className="text-sm font-bold text-white">{u.name}</p>
                    <p className="text-[9px] text-gray-600 uppercase tracking-wider">
                      ID: {u.id.slice(0, 12)}...
                    </p>
                  </div>
                </div>

                <div className="col-span-3">
                  <p className="text-xs text-gray-400 font-light truncate">{u.email}</p>
                </div>

                <div className="col-span-2">
                  <RoleBadge role={u.role} />
                </div>

                <div className="col-span-2 flex items-center justify-end gap-2">
                  {successId === u.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle size={14} className="text-white" />
                    </motion.div>
                  )}
                  {updatingId === u.id ? (
                    <Loader2 size={14} className="animate-spin text-white" />
                  ) : (
                    <div className="relative">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                        className="appearance-none bg-black border border-white/10 text-white text-[10px] uppercase tracking-[0.2em] font-bold py-2 pl-3 pr-8 cursor-pointer hover:border-white/30 focus:border-white/50 focus:outline-none transition-colors"
                      >
                        <option value="customer">Customer</option>
                        <option value="barber">Barber</option>
                        <option value="admin">Admin</option>
                      </select>
                      <ChevronDown
                        size={10}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───
export default function DashboardPage() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const role: Role = (user?.publicMetadata?.role as Role) || "customer";

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-white" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <Shield size={48} className="text-white mx-auto" />
          <h2 className="text-3xl font-bold uppercase">
            ACCESS <span className="text-gray-500">REQUIRED</span>
          </h2>
          <Link
            href="/login"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-colors"
          >
            Sign In <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const greetings: Record<Role, string> = {
    admin: "Command Center",
    barber: "Your Studio",
    customer: "Welcome Back",
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={user.fullName || "User"}
                className="w-14 h-14 object-cover border border-white/10"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white border-2 border-black" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">
                {greetings[role]}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold uppercase">
                {user.firstName || "Guest"}{" "}
                <span className="text-gray-500">{user.lastName || ""}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleBadge role={role} />
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="flex items-center gap-2 px-5 py-3 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-white hover:border-white/30 transition-all"
            >
              <LogOut size={12} />
              Sign Out
            </button>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          <div className="w-2 h-2 bg-white" />
          <div className="h-px flex-1 bg-gradient-to-l from-white/20 to-transparent" />
        </div>

        {/* Role-based Content */}
        <AnimatePresence mode="wait">
          {role === "admin" && <AdminDashboard />}
          {role === "barber" && <BarberDashboard />}
          {role === "customer" && <CustomerDashboard />}
        </AnimatePresence>
      </div>
    </div>
  );
}
