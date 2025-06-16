import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { menuItems } from '@/constants/menuItems';

const DesktopNav = () => {
  const { url } = usePage();

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

  return (
    <div className="hidden lg:flex relative">
      {/* Effet de brillance décoratif en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-30 rounded-xl" />
      
      {/* Particules décoratives sophistiquées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + i * 20}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.4, 1],
              y: [0, -10, 0],
              x: [0, Math.random() * 8 - 4, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
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

      <NavigationMenu className="relative z-10 bg-white/5 backdrop-blur-sm rounded-xl">
        <NavigationMenuList className="flex items-center space-x-1">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index} className="relative group">
              {item.children ? (
                // Menu avec sous-éléments - Style sophistiqué
                <>
                  <NavigationMenuTrigger 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-white/90 hover:text-white",
                      "bg-white/5 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10",
                      "focus:bg-gradient-to-r focus:from-white/15 focus:to-white/10 focus:text-white",
                      "data-[state=open]:bg-gradient-to-r data-[state=open]:from-[color:var(--primary-500)]/20 data-[state=open]:to-[color:var(--accent-500)]/20 data-[state=open]:text-white",
                      "transition-all duration-300 ease-out",
                      "backdrop-blur-sm border border-white/10 hover:border-white/20",
                      "shadow-lg hover:shadow-xl hover:shadow-white/10",
                      "relative overflow-hidden rounded-xl",
                      (isActiveRoute(item) || isActiveParent(item)) && 
                        "bg-gradient-to-r from-[color:var(--primary-500)]/30 to-[color:var(--accent-500)]/30 text-white border-white/30 shadow-[color:var(--primary-500)]/20"
                    )}
                  >
                    {/* Effet de brillance interne au hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    <motion.div 
                      className="flex items-center gap-2 relative z-10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon && (
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className="h-4 w-4" />
                        </motion.div>
                      )}
                      <span className="font-medium tracking-wide">{item.label}</span>
                      {(isActiveRoute(item) || isActiveParent(item)) && (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles size={12} className="text-yellow-300" />
                        </motion.div>
                      )}
                    </motion.div>
                  </NavigationMenuTrigger>
                  
                  <NavigationMenuContent className="min-w-[350px] p-2 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md border border-white/20 shadow-2xl">
                    <motion.div 
                      className="grid gap-1 relative"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Effet de brillance dans le menu déroulant */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-50)]/50 via-[color:var(--accent-50)]/30 to-[color:var(--primary-50)]/50 rounded-lg" />
                      
                      {item.children.map((child, childIndex) => (
                        <motion.div
                          key={childIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: childIndex * 0.05 }}
                          className="relative"
                        >
                          <Link
                            href={route(child.href)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl p-4 text-sm transition-all duration-300 relative overflow-hidden",
                              "hover:bg-gradient-to-r hover:from-[color:var(--primary-500)]/10 hover:to-[color:var(--accent-500)]/10",
                              "focus:bg-gradient-to-r focus:from-[color:var(--primary-500)]/10 focus:to-[color:var(--accent-500)]/10",
                              "hover:shadow-lg hover:scale-[1.02] hover:translate-x-1",
                              "border border-transparent hover:border-[color:var(--primary-200)]/50",
                              "group",
                              url === route(child.href) && 
                                "bg-gradient-to-r from-[color:var(--primary-500)]/20 to-[color:var(--accent-500)]/20 text-[color:var(--primary-700)] shadow-lg border-[color:var(--primary-300)]/50"
                            )}
                          >
                            {/* Effet de brillance interne */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />
                            
                            {child.icon && (
                              <motion.div 
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--primary-500)]/20 to-[color:var(--accent-500)]/20 shadow-lg relative z-10"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <child.icon className="h-5 w-5 text-[color:var(--primary-700)]" />
                              </motion.div>
                            )}
                            <div className="flex-1 relative z-10">
                              <div className="font-semibold text-gray-900 group-hover:text-[color:var(--primary-700)] transition-colors">
                                {child.label}
                              </div>
                            </div>
                            
                            {url === route(child.href) && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="relative z-10"
                              >
                                <Sparkles size={14} className="text-[color:var(--primary-700)]" />
                              </motion.div>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </NavigationMenuContent>
                </>
              ) : (
                // Menu simple sans sous-éléments - Style sophistiqué
                <Link
                  href={route(item.href)}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white/90 hover:text-white",
                    "bg-white/5 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10",
                    "focus:bg-gradient-to-r focus:from-white/15 focus:to-white/10 focus:text-white",
                    "transition-all duration-300 ease-out",
                    "backdrop-blur-sm border border-white/10 hover:border-white/20",
                    "shadow-lg hover:shadow-xl hover:shadow-white/10",
                    "relative overflow-hidden rounded-xl group",
                    isActiveRoute(item) && 
                      "bg-gradient-to-r from-[color:var(--primary-500)]/30 to-[color:var(--accent-500)]/30 text-white border-white/30 shadow-[color:var(--primary-500)]/20"
                  )}
                >
                  {/* Effet de brillance interne au hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <motion.div 
                    className="flex items-center gap-2 relative z-10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon && (
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="h-4 w-4" />
                      </motion.div>
                    )}
                    <span className="font-medium tracking-wide">{item.label}</span>
                    {isActiveRoute(item) && (
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles size={12} className="text-yellow-300" />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              )}
              
              {/* Indicateur actif sophistiqué */}
              {(isActiveRoute(item) || isActiveParent(item)) && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[color:var(--primary-400)] via-[color:var(--accent-400)] to-[color:var(--primary-400)] rounded-full shadow-lg"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
              
              {/* Effet de halo au hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-500)]/10 via-[color:var(--accent-500)]/10 to-[color:var(--primary-500)]/10 rounded-xl opacity-0 group-hover:opacity-100 -z-10 blur-xl"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNav;
