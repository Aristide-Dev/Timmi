"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, User, UserCheck, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: React.ComponentType<{ className?: string }>;
  verified?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marie Dubois",
    role: "Mère de famille",
    content: "Grâce à TIMMI, j'ai trouvé un excellent professeur de maths pour ma fille. Les cours se passent très bien et ses notes ont considérablement progressé !",
    rating: 5,
    avatar: User,
    verified: true
  },
  {
    id: "2",
    name: "Ahmed Benali",
    role: "Père de famille",
    content: "Interface très intuitive et professeurs très qualifiés. Le système de paiement sécurisé me rassure complètement.",
    rating: 5,
    avatar: UserCheck,
    verified: true
  },
  {
    id: "3",
    name: "Sophie Martin",
    role: "Élève de Terminale",
    content: "Mon professeur de physique est génial ! Il m'aide beaucoup à comprendre les concepts difficiles. Je recommande vivement !",
    rating: 5,
    avatar: GraduationCap,
    verified: true
  },
  {
    id: "4",
    name: "Pierre Moreau",
    role: "Père de famille",
    content: "Plateforme excellente ! J'ai trouvé un professeur d'anglais parfait pour mon fils en quelques clics. Très satisfait du service.",
    rating: 4,
    avatar: User,
    verified: false
  },
  {
    id: "5",
    name: "Claire Rousseau",
    role: "Mère de famille",
    content: "Les professeurs sont très professionnels et les cours sont de qualité. Mon enfant a fait d'énormes progrès en chimie.",
    rating: 5,
    avatar: UserCheck,
    verified: true
  },
  {
    id: "6",
    name: "Thomas Bernard",
    role: "Élève de Première",
    content: "Super expérience ! Mon professeur d'histoire est passionnant et m'aide beaucoup à réviser pour le bac.",
    rating: 5,
    avatar: GraduationCap,
    verified: true
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="p-6 h-full bg-gradient-to-br from-background to-muted/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] backdrop-blur-sm">
        {/* Quote icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Quote className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-center mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < testimonial.rating
                    ? "text-[color:var(--accent-400)] fill-current"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <blockquote className="text-center mb-6">
          <p className="text-foreground/90 italic leading-relaxed">
            "{testimonial.content}"
          </p>
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <testimonial.avatar className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <h4 className="font-semibold text-foreground">
                {testimonial.name}
              </h4>
              {testimonial.verified && (
                <div className="w-4 h-4 bg-[color:var(--accent-500)] rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les témoignages de parents et d'élèves qui font confiance à TIMMI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                4.9/5
              </div>
              <div className="text-muted-foreground">
                Note moyenne
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                1200+
              </div>
              <div className="text-muted-foreground">
                Avis clients
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                98%
              </div>
              <div className="text-muted-foreground">
                Satisfaction
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
