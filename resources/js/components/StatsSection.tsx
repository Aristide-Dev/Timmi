"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, Clock, Star, TrendingUp, Award } from "lucide-react";

interface Stat {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const stats: Stat[] = [
  {
    number: "500+",
    label: "Professeurs qualifiés",
    icon: GraduationCap,
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "1200+",
    label: "Élèves accompagnés",
    icon: Users,
    color: "from-green-500 to-green-600"
  },
  {
    number: "15k+",
    label: "Heures de cours données",
    icon: Clock,
    color: "from-purple-500 to-purple-600"
  },
  {
    number: "4.9/5",
    label: "Note moyenne",
    icon: Star,
    color: "from-yellow-500 to-yellow-600"
  },
  {
    number: "98%",
    label: "Taux de satisfaction",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-600"
  },
  {
    number: "50+",
    label: "Villes couvertes",
    icon: Award,
    color: "from-orange-500 to-orange-600"
  }
];

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center hover:scale-105 transition-transform duration-300">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        </div>

        {/* Icon */}
        <div className="relative mb-4">
          <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
            <stat.icon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Number */}
        <div className="relative mb-2">
          <motion.div
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            viewport={{ once: true }}
          >
            {stat.number}
          </motion.div>
        </div>

        {/* Label */}
        <div className="relative">
          <p className="text-slate-300 text-sm font-medium">
            {stat.label}
          </p>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            TIMMI en chiffres
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Une communauté grandissante de professeurs et d'élèves qui nous font confiance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">
              Rejoignez plus de 1000 familles satisfaites
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
