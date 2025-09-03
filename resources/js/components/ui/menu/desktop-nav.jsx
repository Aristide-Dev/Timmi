import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuItems } from '@/constants/menuItems';

const DesktopNav = () => {
  const { url } = usePage();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRefs = useRef({});
  const hoverTimeoutRef = useRef(null);

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

  // Gestion des clics à l'extérieur et des touches d'échappement
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (openDropdown && !dropdownRefs.current[openDropdown]?.contains(target)) {
        setOpenDropdown(null);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && openDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [openDropdown]);

  // Gestion sophistiquée du hover avec délais
  const handleItemHover = (label, isEntering) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (isEntering) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredItem(label);
      }, 50);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredItem(null);
      }, 100);
    }
  };

  return (
    <motion.nav 
      className="hidden md:flex items-center space-x-2 whitespace-nowrap m-0 px-6 py-0 rounded-xl"
      role="navigation"
      aria-label="Menu principal"
    >
      {/* Effet de brillance décoratif en arrière-plan */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-30 rounded-xl" /> */}
      
      {/* Particules décoratives sophistiquées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.4, 1],
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Étoiles scintillantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Effet de brillance animé */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 3
          }}
        />
      </div>

      

      {menuItems.map((item) => {
        const isActive = item.href && item.href !== '#' && isActiveRoute(item);
        const isDropdownActive = item.actif && item.actif !== '#' && isActiveRoute(item);
        const isHovered = hoveredItem === item.label;

        return (
                    <motion.div 
            key={item.label} 
            className="relative" 
            ref={(el) => {
              dropdownRefs.current[item.label] = el;
            }}
            onMouseEnter={() => handleItemHover(item.label, true)}
            onMouseLeave={() => handleItemHover(item.label, false)}
          >
            {!item.children ? (
              <motion.a
                href={item.href && item.href !== '#' ? route(item.href) : '#'}
                className={`flex items-center px-4 py-2 rounded-lg text-md font-medium
                  ${isActive ? 
                    'bg-white text-[color:var(--primary-500)] shadow-lg' : 
                    'text-white hover:bg-white/10'
                  }
                  ${isHovered ? 'shadow-md' : ''}
                `}
                    >
                      {item.icon && (
                  <motion.div>
                    <item.icon className="w-4 h-4 mr-2" />
                        </motion.div>
                      )}
                <span>{item.label}</span>
              </motion.a>
            ) : (
              <>
                <motion.button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className={`flex items-center px-4 py-2 rounded-lg text-md font-medium
                    ${isDropdownActive || openDropdown === item.label ? 
                      'bg-white text-[color:var(--primary-500)] shadow-lg' : 
                      'text-white hover:bg-white/10'
                    }
                    ${isHovered ? 'shadow-md' : ''}
                  `}
                >
                  {item.icon && (
                    <motion.div>
                      <item.icon className="w-4 h-4 mr-2" />
                    </motion.div>
                  )}
                  <span>{item.label}</span>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ 
                      rotate: openDropdown === item.label ? 180 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openDropdown === item.label && item.children && (
                    <motion.div 
                      className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-sm border border-white/20 
                        rounded-lg shadow-xl py-2 min-w-[240px] z-10"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 22,
                        mass: 0.8
                      }}
                    >
                      {item.children.map((child, index) => {
                        const isChildActive = child.href && child.href !== '#' && isActiveRoute(child);
                        return (
                          <motion.a
                            key={child.label}
                            href={child.href && child.href !== '#' ? route(child.href) : '#'}
                            className={`flex items-center px-4 py-3 text-sm transition-all duration-300 relative group
                              ${isChildActive ? 
                                'bg-[color:var(--primary-500)]/10 text-[color:var(--primary-500)] font-semibold' : 
                                'text-gray-700 hover:bg-[color:var(--primary-500)]/5 hover:text-[color:var(--primary-500)]'
                              }
                            `}
                            initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.2, 
                              delay: index * 0.03
                            }}
                          >
                            <motion.div 
                              className="absolute left-0 top-0 bottom-0 w-1 bg-[color:var(--primary-500)]"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: isChildActive ? 1 : 0 }}
                              transition={{ duration: 0.2 }}
                            />
                            {child.icon && (
                              <child.icon className="w-4 h-4 mr-3 text-[color:var(--primary-500)]/70 group-hover:text-[color:var(--primary-500)] transition-colors duration-300" />
                            )}
                            <span>{child.label}</span>
                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
                    )}
                  </motion.div>
        );
      })}
    </motion.nav>
  );
};

export default DesktopNav;
