"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, BookOpen, GraduationCap, Filter, X, Star, Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";

// Types
interface Teacher {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  hourly_rate?: number;
  experience_years?: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  subjects?: Array<{
    id: number;
    name: string;
  }>;
  levels?: Array<{
    id: number;
    name: string;
  }>;
  cities?: Array<{
    id: number;
    name: string;
  }>;
  reviews?: Array<{
    id: number;
    rating: number;
    comment: string;
    student: {
      name: string;
    };
  }>;
  bookings?: Array<{
    id: number;
    status: string;
  }>;
}

interface FilterState {
  subject: string;
  level: string;
  city: string;
  priceRange: [number, number];
  rating: number;
}

interface TeacherSearchProps {
  teachers: {
    data: Teacher[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
  subjects: Array<{ id: number; name: string }>;
  levels: Array<{ id: number; name: string }>;
  cities: Array<{ id: number; name: string }>;
  filters: {
    search?: string;
    subject?: string;
    level?: string;
    city?: string;
    min_price?: number;
    max_price?: number;
    min_rating?: number;
  };
}

// Helper functions
const getTeacherRating = (teacher: Teacher): number => {
  if (!teacher.reviews || teacher.reviews.length === 0) return 0;
  const totalRating = teacher.reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / teacher.reviews.length;
};

const getTeacherReviewCount = (teacher: Teacher): number => {
  return teacher.reviews?.length || 0;
};

const getTeacherSubjects = (teacher: Teacher): string[] => {
  return teacher.subjects?.map(s => s.name) || [];
};

const getTeacherLevels = (teacher: Teacher): string[] => {
  return teacher.levels?.map(l => l.name) || [];
};

const getTeacherCities = (teacher: Teacher): string[] => {
  return teacher.cities?.map(c => c.name) || [];
};

const getTeacherAvailability = (teacher: Teacher): string => {
  const activeBookings = teacher.bookings?.filter(b => 
    b.status === 'confirmed' || b.status === 'pending'
  ).length || 0;
  return activeBookings > 0 ? "Occupé" : "Disponible";
};

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
  const rating = getTeacherRating(teacher);
  const reviewCount = getTeacherReviewCount(teacher);
  const subjects = getTeacherSubjects(teacher);
  const levels = getTeacherLevels(teacher);
  const cities = getTeacherCities(teacher);
  const availability = getTeacherAvailability(teacher);

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
              src={teacher.avatar || "/images/default-avatar.png"}
              alt={teacher.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
            />
            {teacher.is_verified && (
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
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-slate-500">
                  ({reviewCount} avis)
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {teacher.hourly_rate || 0}GNF
            </div>
            <div className="text-sm text-slate-500">par heure</div>
          </div>
        </div>

        {/* Subject and level */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {subjects.slice(0, 2).map((subject, index) => (
            <div key={index} className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              <BookOpen className="h-3 w-3" />
              {subject}
            </div>
          ))}
          {levels.slice(0, 1).map((level, index) => (
            <div key={index} className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
              <GraduationCap className="h-3 w-3" />
              {level}
            </div>
          ))}
        </div>

        {/* Location and experience */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
          {cities.slice(0, 1).map((city, index) => (
            <div key={index} className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {city}
            </div>
          ))}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {teacher.experience_years || 0} ans d'exp.
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {teacher.bio || "Professeur qualifié disponible pour des cours particuliers."}
        </p>

        {/* Availability and action */}
        <div className="flex items-center justify-between">
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            availability === "Disponible"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
              : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
          )}>
            {availability}
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
const TeacherSearchComponent = ({ teachers, subjects, levels, cities, filters: initialFilters }: TeacherSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || "");
  const [filters, setFilters] = useState<FilterState>({
    subject: initialFilters?.subject || "Toutes matières",
    level: initialFilters?.level || "Tous niveaux",
    city: initialFilters?.city || "Toutes villes",
    priceRange: [initialFilters?.min_price || 0, initialFilters?.max_price || 100],
    rating: initialFilters?.min_rating || 0
  });
  const [showFilters, setShowFilters] = useState(false);

  // Initialiser les filtres avec les paramètres d'URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    const searchParam = urlParams.get('search');
    
    if (subjectParam) {
      setFilters(prev => ({
        ...prev,
        subject: subjectParam
      }));
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  // Préparer les options pour les dropdowns
  const subjectOptions = ["Toutes matières", ...subjects.map(s => s.name)];
  const levelOptions = ["Tous niveaux", ...levels.map(l => l.name)];
  const cityOptions = ["Toutes villes", ...cities.map(c => c.name)];

  // Les professeurs sont déjà filtrés côté serveur
  const filteredTeachers = teachers.data;

  const activeFiltersCount = Object.values(filters).filter((value, index) => {
    if (index === 0) return value !== "Toutes matières";
    if (index === 1) return value !== "Tous niveaux";
    if (index === 2) return value !== "Toutes villes";
    if (index === 3) return value[0] !== 0 || value[1] !== 100;
    if (index === 4) return value !== 0;
    return false;
  }).length;

  // Fonction pour effectuer une nouvelle recherche (navigation Inertia, sans rechargement complet)
  const performSearch = (newFilters: Partial<FilterState>, newSearchQuery?: string) => {
    const params: Record<string, string | number> = {};

    const effectiveSearch = newSearchQuery !== undefined ? newSearchQuery : searchQuery;
    if (effectiveSearch && effectiveSearch.trim()) {
      params.search = effectiveSearch.trim();
    }

    if (newFilters.subject && newFilters.subject !== "Toutes matières") {
      params.subject = newFilters.subject;
    }
    if (newFilters.level && newFilters.level !== "Tous niveaux") {
      params.level = newFilters.level;
    }
    if (newFilters.city && newFilters.city !== "Toutes villes") {
      params.city = newFilters.city;
    }
    if (newFilters.priceRange) {
      if (newFilters.priceRange[0] > 0) params.min_price = newFilters.priceRange[0];
      if (newFilters.priceRange[1] < 100) params.max_price = newFilters.priceRange[1];
    }
    if (newFilters.rating && newFilters.rating > 0) {
      params.min_rating = newFilters.rating;
    }

    router.get(window.location.pathname, params, {
      preserveScroll: true,
      replace: true,
    });
  };

  // Gestion de la recherche textuelle avec debounce (Inertia soft navigation)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== initialFilters?.search) {
        performSearch(filters, searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const clearFilters = () => {
    setFilters({
      subject: "Toutes matières",
      level: "Tous niveaux",
      city: "Toutes villes",
      priceRange: [0, 100],
      rating: 0
    });
    setSearchQuery("");
    performSearch({
      subject: "Toutes matières",
      level: "Tous niveaux",
      city: "Toutes villes",
      priceRange: [0, 100],
      rating: 0
    }, "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden py-12 lg:py-24">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-900)]/95 via-[color:var(--primary-800)]/95 to-[color:var(--primary-700)]/95 shadow-2xl border-b border-white/10 opacity-95" />
        <div className="absolute min-h-screen h-full w-full bg-[url('/images/heros/hero-03.jpg')] bg-contain md:bg-cover bg-no-repeat bg-fixed"></div>
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
                options={subjectOptions}
                onChange={(value) => {
                  const newFilters = { ...filters, subject: value };
                  setFilters(newFilters);
                  performSearch(newFilters);
                }}
                icon={BookOpen}
              />
              <FilterDropdown
                label="Niveau"
                value={filters.level}
                options={levelOptions}
                onChange={(value) => {
                  const newFilters = { ...filters, level: value };
                  setFilters(newFilters);
                  performSearch(newFilters);
                }}
                icon={GraduationCap}
              />
              <FilterDropdown
                label="Ville"
                value={filters.city}
                options={cityOptions}
                onChange={(value) => {
                  const newFilters = { ...filters, city: value };
                  setFilters(newFilters);
                  performSearch(newFilters);
                }}
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
                        Prix par heure: {filters.priceRange[0]}GNF - {filters.priceRange[1]}GNF
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

        {/* Pagination */}
        {teachers.last_page > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2">
              {/* Bouton Précédent */}
              {teachers.current_page > 1 && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    params.set('page', (teachers.current_page - 1).toString());
                    router.get(`${window.location.pathname}?${params.toString()}`, {}, { preserveScroll: true, replace: true });
                  }}
                  className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Précédent
                </button>
              )}

              {/* Numéros de page */}
              {teachers.links.map((link, index) => {
                if (link.url === null) {
                  return (
                    <span
                      key={index}
                      className={`px-4 py-2 rounded-lg ${
                        link.active
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {link.label}
                    </span>
                  );
                }

                return (
                  <button
                    key={index}
                    onClick={() => {
                      const url = new URL(link.url!);
                      const page = url.searchParams.get('page');
                      const params = new URLSearchParams(window.location.search);
                      if (page) {
                        params.set('page', page);
                      } else {
                        params.delete('page');
                      }
                      router.get(`${window.location.pathname}?${params.toString()}`, {}, { preserveScroll: true, replace: true });
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      link.active
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* Bouton Suivant */}
              {teachers.current_page < teachers.last_page && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    params.set('page', (teachers.current_page + 1).toString());
                    router.get(`${window.location.pathname}?${params.toString()}`, {}, { preserveScroll: true, replace: true });
                  }}
                  className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Suivant
                </button>
              )}
            </div>
          </motion.div>
        )}

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
