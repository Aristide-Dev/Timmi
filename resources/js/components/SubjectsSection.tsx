"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calculator, Languages, Atom, FlaskConical, History, Globe, Dna, Brain,
  DollarSign, Monitor, Palette, BookOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Subject {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

const subjects: Subject[] = [
  {
    name: "Mathématiques",
    icon: Calculator,
    color: "from-blue-500 to-blue-600",
    description: "Algèbre, géométrie, calcul"
  },
  {
    name: "Français",
    icon: BookOpen,
    color: "from-green-500 to-green-600",
    description: "Littérature, grammaire, expression"
  },
  {
    name: "Anglais",
    icon: Languages,
    color: "from-red-500 to-red-600",
    description: "Conversation, grammaire, vocabulaire"
  },
  {
    name: "Physique",
    icon: Atom,
    color: "from-purple-500 to-purple-600",
    description: "Mécanique, optique, électricité"
  },
  {
    name: "Chimie",
    icon: FlaskConical,
    color: "from-orange-500 to-orange-600",
    description: "Organique, inorganique, analytique"
  },
  {
    name: "Histoire",
    icon: History,
    color: "from-yellow-500 to-yellow-600",
    description: "Antiquité, Moyen Âge, contemporaine"
  },
  {
    name: "Géographie",
    icon: Globe,
    color: "from-teal-500 to-teal-600",
    description: "Physique, humaine, économique"
  },
  {
    name: "SVT",
    icon: Dna,
    color: "from-pink-500 to-pink-600",
    description: "Biologie, géologie, écologie"
  },
  {
    name: "Philosophie",
    icon: Brain,
    color: "from-indigo-500 to-indigo-600",
    description: "Logique, éthique, métaphysique"
  },
  {
    name: "Économie",
    icon: DollarSign,
    color: "from-emerald-500 to-emerald-600",
    description: "Micro, macro, gestion"
  },
  {
    name: "Informatique",
    icon: Monitor,
    color: "from-gray-500 to-gray-600",
    description: "Programmation, algorithmique"
  },
  {
    name: "Arts",
    icon: Palette,
    color: "from-rose-500 to-rose-600",
    description: "Plastique, histoire de l'art"
  }
];

const SubjectCard = ({ subject, index }: { subject: Subject; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105 border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-4">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
              <subject.icon className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">
            {subject.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
            {subject.description}
          </p>

          {/* Hover effect */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`w-full h-1 bg-gradient-to-r ${subject.color} rounded-full`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const SubjectsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Toutes les matières disponibles
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Des professeurs qualifiés dans toutes les matières, du primaire au supérieur
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {subjects.map((subject, index) => (
            <SubjectCard key={subject.name} subject={subject} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
              Plus de 50 matières disponibles
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectsSection;
