import { 
  Home,
  Users,
  Phone,
  HelpCircle,
  Search,
  // AlertTriangle,
  // Palette
} from 'lucide-react';

const baseMenuItems = [
  {
    label: 'Accueil',
    href: 'home',
    icon: Home,
  },
  {
    label: 'Rechercher',
    href: 'search.teachers',
    icon: Search,
  },
  {
    label: 'À propos',
    href: 'about',
    icon: Users,
  },
  {
    label: 'FAQ',
    href: 'faq',
    icon: HelpCircle,
  },
  {
    label: 'Contact',
    href: 'contact',
    icon: Phone,
  }
];

// Ajouter des liens de développement en mode développement
const isDevelopment = import.meta.env.DEV;
export const menuItems = isDevelopment 
  ? [...baseMenuItems, 
      // { 
      //   label: '🎨 Thème Demo', 
      //   href: 'theme.demo', 
      //   icon: Palette 
      // },
      // { 
      //   label: '🚨 Test Erreurs', 
      //   href: 'errors.test.index', 
      //   icon: AlertTriangle 
      // }
    ]
  : baseMenuItems;
