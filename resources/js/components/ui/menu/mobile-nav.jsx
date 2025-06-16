import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuItems } from '@/constants/menuItems';

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
          className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 lg:hidden shadow-2xl"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header du menu mobile */}
          <motion.div 
            className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-primary/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-lg font-bold text-gray-900">Menu</span>
              </div>
            </div>
          </motion.div>

          {/* Contenu du menu */}
          <div className="p-6 h-full overflow-y-auto pb-24">
            <nav className="space-y-2">
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
                          "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200",
                          "hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
                          (isActiveRoute(item) || isActiveParent(item)) && "bg-primary/10 text-primary"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && (
                            <div className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-md",
                              (isActiveRoute(item) || isActiveParent(item)) 
                                ? "bg-primary/20 text-primary" 
                                : "bg-gray-100 text-gray-600"
                            )}>
                              <item.icon className="h-4 w-4" />
                            </div>
                          )}
                          <span className="font-medium text-gray-900">{item.label}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4 text-gray-500" />
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
                            className="ml-4 space-y-1 border-l-2 border-gray-100 pl-4"
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
                                    "flex items-center gap-3 p-3 rounded-lg text-sm transition-all duration-200",
                                    "hover:bg-gray-50 focus:bg-gray-50",
                                    url === route(child.href) && "bg-primary/10 text-primary"
                                  )}
                                >
                                  {child.icon && (
                                    <div className={cn(
                                      "flex h-6 w-6 items-center justify-center rounded-md",
                                      url === route(child.href) 
                                        ? "bg-primary/20 text-primary" 
                                        : "bg-gray-100 text-gray-500"
                                    )}>
                                      <child.icon className="h-3 w-3" />
                                    </div>
                                  )}
                                  <span className="font-medium">{child.label}</span>
                                  {url === route(child.href) && (
                                    <motion.div
                                      className="ml-auto w-2 h-2 bg-primary rounded-full"
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
                        "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                        "hover:bg-gray-50 focus:bg-gray-50",
                        isActiveRoute(item) && "bg-primary/10 text-primary"
                      )}
                    >
                      {item.icon && (
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-md",
                          isActiveRoute(item) 
                            ? "bg-primary/20 text-primary" 
                            : "bg-gray-100 text-gray-600"
                        )}>
                          <item.icon className="h-4 w-4" />
                        </div>
                      )}
                      <span className="font-medium text-gray-900">{item.label}</span>
                      {isActiveRoute(item) && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-primary rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  )}

                  {/* Indicateur actif pour les éléments parents */}
                  {(isActiveRoute(item) || isActiveParent(item)) && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Section footer du menu mobile */}
            <motion.div 
              className="mt-8 pt-6 border-t border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">MyApp</p>
                <p className="text-xs text-gray-400">Version 1.0.0</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
