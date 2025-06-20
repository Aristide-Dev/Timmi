import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuItems } from '@/constants/menuItems';
import { appDetails } from '@/constants/app-details';

const MobileNav = ({ isOpen, onClose }) => {
  const { url } = usePage();
  const [expandedItems, setExpandedItems] = useState(new Set());

  const isActiveRoute = (item) => {
    if (item.href) {
      return url === route(item.href);
    }
    if (item.actif) {
      return url.startsWith(route(item.actif.replace('.*', '')));
    }
    return false;
  };

  const isActiveParent = (item) => {
    if (item.children) {
      return item.children.some(child => url === route(child.href));
    }
    return false;
  };

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gradient-to-br from-[color:var(--primary-50)] via-white to-[color:var(--accent-50)] z-50 lg:hidden shadow-2xl overflow-hidden"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Effets de fond décoratifs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Particules flottantes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-[color:var(--primary-400)]/20 to-[color:var(--accent-400)]/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
            
            {/* Gradient animé */}
            <motion.div
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[color:var(--accent-200)]/30 to-transparent rounded-full blur-3xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Header du menu mobile */}
          <motion.div 
            className="relative p-6 border-b border-[color:var(--primary-200)]/30 bg-gradient-to-r from-[color:var(--primary-100)]/50 via-white/80 to-[color:var(--accent-100)]/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="relative w-10 h-10 bg-gradient-to-br from-[color:var(--primary-500)] to-[color:var(--accent-500)] rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <img src="/images/aristech-brand.png" className="size-full object-cover rounded-xl"/>

                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300" />
                </motion.div>
                <div>
                  <span className="text-xl font-bold text-[color:var(--primary-800)]">{appDetails.name}</span>
                  <p className="text-xs text-[color:var(--primary-600)]">Navigation</p>
                </div>
              </div>
              
              {/* Bouton de fermeture */}
              <motion.button
                onClick={onClose}
                className="relative p-2 rounded-xl bg-gradient-to-br from-[color:var(--primary-100)] to-[color:var(--accent-100)] hover:from-[color:var(--primary-200)] hover:to-[color:var(--accent-200)] transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-400)]/0 via-[color:var(--primary-400)]/30 to-[color:var(--primary-400)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <X className="w-5 h-5 text-[color:var(--primary-700)] relative z-10" />
              </motion.button>
            </div>
          </motion.div>

          {/* Contenu du menu */}
          <div className="relative p-6 h-full overflow-y-auto pb-24 scrollbar-thin scrollbar-thumb-[color:var(--primary-400)]/20 scrollbar-track-transparent">
            <nav className="space-y-3">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  {item.children ? (
                    // Menu avec sous-éléments
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleExpanded(index)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden",
                          "hover:bg-gradient-to-r hover:from-[color:var(--primary-100)]/50 hover:to-[color:var(--accent-100)]/50",
                          "focus:bg-gradient-to-r focus:from-[color:var(--primary-100)]/50 focus:to-[color:var(--accent-100)]/50 focus:outline-none",
                          (isActiveRoute(item) || isActiveParent(item)) && "bg-gradient-to-r from-[color:var(--primary-100)] to-[color:var(--accent-100)] shadow-lg"
                        )}
                      >
                        {/* Effet de brillance au hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                        
                        <div className="flex items-center gap-3 relative z-10">
                          {item.icon && (
                            <motion.div 
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-xl shadow-md transition-all duration-300",
                                (isActiveRoute(item) || isActiveParent(item)) 
                                  ? "bg-gradient-to-br from-[color:var(--primary-500)] to-[color:var(--accent-500)] text-white shadow-lg" 
                                  : "bg-gradient-to-br from-[color:var(--primary-100)] to-[color:var(--accent-100)] text-[color:var(--primary-600)]"
                              )}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <item.icon className="h-5 w-5" />
                            </motion.div>
                          )}
                          <span className={cn(
                            "font-semibold transition-colors duration-300",
                            (isActiveRoute(item) || isActiveParent(item)) ? "text-[color:var(--primary-800)]" : "text-[color:var(--primary-700)]"
                          )}>
                            {item.label}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                          className="relative z-10"
                        >
                          <ChevronDown className={cn(
                            "h-5 w-5 transition-colors duration-300",
                            expandedItems.has(index) ? "text-[color:var(--accent-600)]" : "text-[color:var(--primary-500)]"
                          )} />
                        </motion.div>
                      </button>

                      {/* Sous-menu */}
                      <AnimatePresence>
                        {expandedItems.has(index) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 space-y-2 border-l-2 border-[color:var(--primary-200)]/30 pl-4"
                          >
                            {item.children.map((child, childIndex) => (
                              <motion.div
                                key={childIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: childIndex * 0.05 }}
                              >
                                <Link
                                  href={route(child.href)}
                                  onClick={handleLinkClick}
                                  className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl text-sm transition-all duration-300 group relative overflow-hidden",
                                    "hover:bg-gradient-to-r hover:from-[color:var(--primary-100)]/30 hover:to-[color:var(--accent-100)]/30",
                                    "focus:bg-gradient-to-r focus:from-[color:var(--primary-100)]/30 focus:to-[color:var(--accent-100)]/30",
                                    url === route(child.href) && "bg-gradient-to-r from-[color:var(--primary-100)]/50 to-[color:var(--accent-100)]/50"
                                  )}
                                >
                                  {child.icon && (
                                    <div className={cn(
                                      "flex h-6 w-6 items-center justify-center rounded-md",
                                      url === route(child.href) 
                                        ? "bg-[color:var(--primary-500)]/20 text-[color:var(--primary-700)]" 
                                        : "bg-gray-100 text-gray-500"
                                    )}>
                                      <child.icon className="h-3 w-3" />
                                    </div>
                                  )}
                                  <span className="font-medium">{child.label}</span>
                                  {url === route(child.href) && (
                                    <motion.div
                                      className="ml-auto w-2 h-2 bg-[color:var(--primary-500)] rounded-full"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Menu simple sans sous-éléments
                    <Link
                      href={route(item.href)}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                        "hover:bg-gradient-to-r hover:from-[color:var(--primary-100)]/50 hover:to-[color:var(--accent-100)]/50",
                        "focus:bg-gradient-to-r focus:from-[color:var(--primary-100)]/50 focus:to-[color:var(--accent-100)]/50",
                        isActiveRoute(item) && "bg-gradient-to-r from-[color:var(--primary-100)] to-[color:var(--accent-100)] shadow-lg"
                      )}
                    >
                      {/* Effet de brillance au hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                      
                      {item.icon && (
                        <motion.div 
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl shadow-md transition-all duration-300 relative z-10",
                            isActiveRoute(item) 
                              ? "bg-gradient-to-br from-[color:var(--primary-500)] to-[color:var(--accent-500)] text-white shadow-lg" 
                              : "bg-gradient-to-br from-[color:var(--primary-100)] to-[color:var(--accent-100)] text-[color:var(--primary-600)]"
                          )}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className="h-5 w-5" />
                        </motion.div>
                      )}
                      <span className={cn(
                        "font-semibold transition-colors duration-300 relative z-10",
                        isActiveRoute(item) ? "text-[color:var(--primary-800)]" : "text-[color:var(--primary-700)]"
                      )}>
                        {item.label}
                      </span>
                      {isActiveRoute(item) && (
                        <motion.div
                          className="ml-auto w-3 h-3 bg-gradient-to-br from-[color:var(--accent-400)] to-[color:var(--accent-600)] rounded-full shadow-md relative z-10"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        />
                      )}
                    </Link>
                  )}

                  {/* Indicateur actif pour les éléments parents */}
                  {(isActiveRoute(item) || isActiveParent(item)) && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[color:var(--primary-500)] to-[color:var(--accent-500)] rounded-r-full shadow-lg"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    />
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Section footer du menu mobile */}
            <motion.div 
              className="mt-8 pt-6 border-t border-[color:var(--primary-200)]/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="bg-gradient-to-r from-[color:var(--primary-100)]/30 to-[color:var(--accent-100)]/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-center mb-4">
                  <p className="text-lg font-bold text-[color:var(--primary-800)] mb-1">{appDetails.name}</p>
                  <p className="text-sm text-[color:var(--primary-600)]">Version {appDetails.version}</p>
                </div>
                
                {/* Réseaux sociaux */}
                <div className="flex justify-center gap-2 mb-4">
                  {appDetails.social.slice(0, 4).map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4 h-4 text-[color:var(--primary-600)] group-hover:text-[color:var(--primary-800)]" />
                    </motion.a>
                  ))}
                </div>
                
                {/* Contact rapide */}
                <div className="text-center">
                  <a 
                    href={`mailto:${appDetails.authorEmail}`}
                    className="text-xs text-[color:var(--primary-600)] hover:text-[color:var(--primary-800)] transition-colors"
                  >
                    {appDetails.authorEmail}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
