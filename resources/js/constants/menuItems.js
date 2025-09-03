import { 
  Home,
  FileText,
  Users,
  Heart,
  Newspaper,
  Briefcase,
  Phone,
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
    label: 'Articles',
    href: 'articles',
    icon: Newspaper,
  },
  {
    label: 'Services',
    href: 'services', 
    icon: Briefcase,
  },
  {
    label: 'À propos',
    icon: Users,
    actif: 'about.*',
    children: [
      { label: 'Notre équipe', href: 'about', icon: Users },
      { label: 'Notre mission', href: 'about', icon: FileText },
      { label: 'Nos valeurs', href: 'about', icon: Heart },
    ]
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
