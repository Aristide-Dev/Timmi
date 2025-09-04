"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, BookOpen, GraduationCap, Filter, X, Star, Clock, Users, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Teacher {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  level: string;
  city: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  experience: number;
  description: string;
  languages: string[];
  availability: string;
  verified: boolean;
  responseTime: string;
}

interface FilterState {
  subject: string;
  level: string;
  city: string;
  priceRange: [number, number];
  rating: number;
}

// Sample data
const sampleTeachers: Teacher[] = [
  {
    id: "1",
    name: "Marie Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    subject: "Mathématiques",
    level: "Lycée",
    city: "Paris",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 35,
    experience: 8,
    description: "Professeure certifiée avec 8 ans d'expérience. Spécialisée dans la préparation au baccalauréat.",
    languages: ["Français", "Anglais"],
    availability: "Disponible",
    verified: true,
    responseTime: "< 2h"
  },
  {
    id: "2",
    name: "Jean Martin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    subject: "Physique",
    level: "Université",
    city: "Lyon",
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 42,
    experience: 12,
    description: "Docteur en physique, ancien chercheur au CNRS. Cours particuliers et préparation aux concours.",
    languages: ["Français", "Anglais", "Allemand"],
    availability: "Disponible",
    verified: true,
    responseTime: "< 1h"
  },
  {
    id: "3",
    name: "Sophie Laurent",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    subject: "Français",
    level: "Collège",
    city: "Marseille",
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 28,
    experience: 6,
    description: "Passionnée de littérature, j'aide les élèves à améliorer leur expression écrite et orale.",
    languages: ["Français", "Espagnol"],
    availability: "Occupée",
    verified: true,
    responseTime: "< 4h"
  },
  {
    id: "4",
    name: "Pierre Moreau",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    subject: "Anglais",
    level: "Primaire",
    city: "Toulouse",
    rating: 4.6,
    reviewCount: 203,
    hourlyRate: 25,
    experience: 4,
    description: "Professeur d'anglais natif, méthodes ludiques et interactives pour tous les âges.",
    languages: ["Anglais", "Français"],
    availability: "Disponible",
    verified: false,
    responseTime: "< 6h"
  },
  {
    id: "5",
    name: "Claire Rousseau",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    subject: "Chimie",
    level: "Lycée",
    city: "Nice",
    rating: 4.9,
    reviewCount: 94,
    hourlyRate: 38,
    experience: 10,
    description: "Ingénieure chimiste, spécialisée dans la préparation aux concours d'ingénieurs.",
    languages: ["Français", "Italien"],
    availability: "Disponible",
    verified: true,
    responseTime: "< 3h"
  },
  {
    id: "6",
    name: "Thomas Bernard",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    subject: "Histoire",
    level: "Collège",
    city: "Bordeaux",
    rating: 4.5,
    reviewCount: 78,
    hourlyRate: 30,
    experience: 7,
    description: "Historien passionné, j'aide les élèves à comprendre et mémoriser les événements historiques.",
    languages: ["Français"],
    availability: "Disponible",
    verified: true,
    responseTime: "< 2h"
  }
];

const subjects = ["Toutes matières", "Mathématiques", "Physique", "Chimie", "Français", "Anglais", "Histoire", "Géographie", "SVT", "Philosophie"];
const levels = ["Tous niveaux", "Primaire", "Collège", "Lycée", "Université", "Adulte"];
const cities = ["Toutes villes", "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Bordeaux", "Nantes", "Strasbourg", "Lille"];

// Animated search input component
const AnimatedSearchInput = ({ value, onChange, placeholder }: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={cn(
        "relative flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg transition-all duration-300",
        "border-2",
        isFocused ? "border-blue-500 shadow-xl" : "border-slate-200 dark:border-slate-700"
      )}>
        <Search className="absolute left-4 h-5 w-5 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none text-lg"
        />
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

// Filter dropdown component
const FilterDropdown = ({ label, value, options, onChange, icon: Icon }: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-md",
          "border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600",
          "transition-all duration-200 min-w-[160px] justify-between",
          isOpen && "border-blue-500 shadow-lg"
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {value === options[0] ? label : value}
          </span>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-slate-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",
                  "first:rounded-t-xl last:rounded-b-xl",
                  value === option && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                )}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Teacher card component
const TeacherCard = ({ teacher }: { teacher: Teacher }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 group"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
            />
            {teacher.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
              {teacher.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {teacher.rating}
                </span>
                <span className="text-sm text-slate-500">
                  ({teacher.reviewCount} avis)
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {teacher.hourlyRate}€
            </div>
            <div className="text-sm text-slate-500">par heure</div>
          </div>
        </div>

        {/* Subject and level */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            <BookOpen className="h-3 w-3" />
            {teacher.subject}
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
            <GraduationCap className="h-3 w-3" />
            {teacher.level}
          </div>
        </div>

        {/* Location and experience */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {teacher.city}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {teacher.experience} ans d'exp.
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Répond en {teacher.responseTime}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {teacher.description}
        </p>

        {/* Languages */}
        <div className="flex flex-wrap gap-1 mb-4">
          {teacher.languages.map((lang) => (
            <span
              key={lang}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Availability and action */}
        <div className="flex items-center justify-between">
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            teacher.availability === "Disponible"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
              : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
          )}>
            {teacher.availability}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
          >
            Contacter
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Main component
const TeacherSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    subject: "Toutes matières",
    level: "Tous niveaux",
    city: "Toutes villes",
    priceRange: [0, 100],
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter teachers based on search and filters
  const filteredTeachers = sampleTeachers.filter((teacher) => {
    const matchesSearch = searchQuery === "" || 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = filters.subject === "Toutes matières" || teacher.subject === filters.subject;
    const matchesLevel = filters.level === "Tous niveaux" || teacher.level === filters.level;
    const matchesCity = filters.city === "Toutes villes" || teacher.city === filters.city;
    const matchesPrice = teacher.hourlyRate >= filters.priceRange[0] && teacher.hourlyRate <= filters.priceRange[1];
    const matchesRating = teacher.rating >= filters.rating;

    return matchesSearch && matchesSubject && matchesLevel && matchesCity && matchesPrice && matchesRating;
  });

  const activeFiltersCount = Object.values(filters).filter((value, index) => {
    if (index === 0) return value !== "Toutes matières";
    if (index === 1) return value !== "Tous niveaux";
    if (index === 2) return value !== "Toutes villes";
    if (index === 3) return value[0] !== 0 || value[1] !== 100;
    if (index === 4) return value !== 0;
    return false;
  }).length;

  const clearFilters = () => {
    setFilters({
      subject: "Toutes matières",
      level: "Tous niveaux",
      city: "Toutes villes",
      priceRange: [0, 100],
      rating: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Trouvez votre professeur idéal
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Découvrez des professeurs qualifiés près de chez vous pour tous les niveaux et toutes les matières
            </p>
          </motion.div>

          {/* Search */}
          <AnimatedSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Rechercher par nom, matière ou ville..."
          />

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <FilterDropdown
                label="Matière"
                value={filters.subject}
                options={subjects}
                onChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}
                icon={BookOpen}
              />
              <FilterDropdown
                label="Niveau"
                value={filters.level}
                options={levels}
                onChange={(value) => setFilters(prev => ({ ...prev, level: value }))}
                icon={GraduationCap}
              />
              <FilterDropdown
                label="Ville"
                value={filters.city}
                options={cities}
                onChange={(value) => setFilters(prev => ({ ...prev, city: value }))}
                icon={MapPin}
              />
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-md",
                  "border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600",
                  "transition-all duration-200",
                  showFilters && "border-blue-500 shadow-lg"
                )}
              >
                <Filter className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Plus de filtres
                </span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span className="text-sm font-medium">Effacer</span>
                </button>
              )}
            </div>

            {/* Extended filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price range */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Prix par heure: {filters.priceRange[0]}€ - {filters.priceRange[1]}€
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={filters.priceRange[0]}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                          }))}
                          className="flex-1"
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                          }))}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Note minimum: {filters.rating}/5
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={filters.rating}
                        onChange={(e) => setFilters(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            {filteredTeachers.length} professeur{filteredTeachers.length !== 1 ? 's' : ''} trouvé{filteredTeachers.length !== 1 ? 's' : ''}
          </h2>
          {searchQuery && (
            <p className="text-slate-600 dark:text-slate-400">
              Résultats pour "{searchQuery}"
            </p>
          )}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTeachers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Aucun professeur trouvé
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
            >
              Effacer tous les filtres
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeacherSearchComponent;
