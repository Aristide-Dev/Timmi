"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calculator, Languages, Atom, FlaskConical, History, Globe, Dna, Brain,
  DollarSign, Monitor, Palette, BookOpen, ArrowRight, List
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

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
    color: "from-[color:var(--primary-500)] to-[color:var(--primary-600)]",
    description: "Algèbre, géométrie, calcul"
  },
  {
    name: "Français",
    icon: BookOpen,
    color: "from-[color:var(--accent-500)] to-[color:var(--accent-600)]",
    description: "Littérature, grammaire, expression"
  },
  {
    name: "Anglais",
    icon: Languages,
    color: "from-[color:var(--primary-600)] to-[color:var(--primary-700)]",
    description: "Conversation, grammaire, vocabulaire"
  },
  {
    name: "Physique",
    icon: Atom,
    color: "from-[color:var(--accent-600)] to-[color:var(--accent-700)]",
    description: "Mécanique, optique, électricité"
  },
  {
    name: "Chimie",
    icon: FlaskConical,
    color: "from-[color:var(--primary-500)] to-[color:var(--accent-500)]",
    description: "Organique, inorganique, analytique"
  },
  {
    name: "Histoire",
    icon: History,
    color: "from-[color:var(--accent-400)] to-[color:var(--accent-500)]",
    description: "Antiquité, Moyen Âge, contemporaine"
  },
  {
    name: "Géographie",
    icon: Globe,
    color: "from-[color:var(--primary-400)] to-[color:var(--primary-500)]",
    description: "Physique, humaine, économique"
  },
  {
    name: "SVT",
    icon: Dna,
    color: "from-[color:var(--accent-500)] to-[color:var(--primary-600)]",
    description: "Biologie, géologie, écologie"
  },
  {
    name: "Philosophie",
    icon: Brain,
    color: "from-[color:var(--primary-700)] to-[color:var(--primary-800)]",
    description: "Logique, éthique, métaphysique"
  },
  {
    name: "Économie",
    icon: DollarSign,
    color: "from-[color:var(--accent-600)] to-[color:var(--primary-500)]",
    description: "Micro, macro, gestion"
  },
  {
    name: "Informatique",
    icon: Monitor,
    color: "from-[color:var(--primary-600)] to-[color:var(--accent-600)]",
    description: "Programmation, algorithmique"
  },
  {
    name: "Arts",
    icon: Palette,
    color: "from-[color:var(--accent-400)] to-[color:var(--accent-600)]",
    description: "Plastique, histoire de l'art"
  }
];

const SubjectCard = ({ subject, index }: { subject: Subject; index: number }) => {
  const handleSubjectClick = () => {
    // Rediriger vers la page de recherche avec la matière comme filtre
    router.visit(route('search.teachers'), {
      data: {
        subject: subject.name
      },
      method: 'get'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card 
        className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105 border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm"
        onClick={handleSubjectClick}
      >
        <div className="text-center">
          {/* Icon */}
          <div className="mb-4">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
              <subject.icon className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {subject.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
            {subject.description}
          </p>

          {/* Hover effect */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`w-full h-1 bg-gradient-to-r ${subject.color} rounded-full`} />
          </div>

          {/* Click indicator */}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <span>Rechercher</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const SubjectsSection = () => {
  const handleViewAllSubjects = () => {
    // Rediriger vers la page de recherche pour voir toutes les matières
    router.visit(route('search.teachers'));
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Toutes les matières disponibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Des professeurs qualifiés dans toutes les matières, du primaire au supérieur
          </p>
          
          {/* Bouton pour voir toutes les matières */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={handleViewAllSubjects}
              variant="outline"
              size="lg"
              className="group bg-background/80 backdrop-blur-sm border-[color:var(--primary-200)] hover:bg-[color:var(--primary-50)] hover:border-[color:var(--primary-300)] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <List className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Voir toutes les matières
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
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
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-background/80 backdrop-blur-sm rounded-full border border-[color:var(--primary-200)] shadow-lg">
            <div className="w-2 h-2 bg-[color:var(--primary-500)] rounded-full animate-pulse" />
            <span className="text-foreground text-sm font-medium">
              Plus de 50 matières disponibles
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectsSection;
