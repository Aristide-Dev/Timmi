# 🚀 Boilerplate Laravel 12 + Inertia React + Tailwind CSS 4

Un boilerplate moderne et production-ready pour démarrer rapidement vos projets avec Laravel 12, Inertia.js, React et Tailwind CSS 4.

## ✨ Caractéristiques

### 🎯 **Technologies Utilisées**
- **Laravel 12** - Framework PHP moderne avec les dernières pratiques
- **Inertia.js** - SPA sans API avec React
- **React 19** - Bibliothèque UI moderne
- **TypeScript** - Typage statique pour React
- **Tailwind CSS 4** - Framework CSS utility-first (sans fichier config)
- **shadcn/ui** - Composants UI modernes et accessibles
- **Lucide React** - Icônes modernes et cohérentes

### 🏗️ **Architecture et Structure**

#### **Frontend (resources/js/)**
```
resources/js/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (shadcn/ui)
│   └── custom/         # Composants métier
├── layouts/            # Layouts d'application
├── pages/              # Pages Inertia
├── hooks/              # Hooks React personnalisés
├── lib/                # Utilitaires et helpers
├── types/              # Types TypeScript
└── app.tsx             # Point d'entrée React
```

#### **Backend (app/)**
```
app/
├── Http/
│   ├── Controllers/    # Contrôleurs Laravel
│   ├── Requests/       # Form Requests
│   └── Middleware/     # Middleware personnalisés
├── Models/             # Modèles Eloquent
└── Providers/          # Service Providers
```

## 🛠️ **Composants et Fonctionnalités Inclus**

### **Hooks Personnalisés**
- `useLocalStorage` - Gestion du localStorage avec React
- `useFavorites` - Système de favoris générique

### **Composants UI**
- `LoadingSpinner` - Indicateurs de chargement
- `ToastProvider` - Système de notifications
- Layout public avec header/footer responsive

### **Utilitaires**
- Formatage des dates, textes
- Helpers pour localStorage
- Fonctions de validation et manipulation

### **Types TypeScript**
- Types complets pour User, PaginatedData, Notification
- Interface PageProps pour Inertia
- Types pour les favoris et notifications

## 🎨 **Système de Thème Tailwind CSS 4**

Le thème est configuré via des variables CSS dans `resources/css/app.css` :

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... autres variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... thème sombre */
}
```

## 🚀 **Installation et Utilisation**

### **Prérequis**
- PHP 8.2+
- Node.js 18+
- Composer
- MySQL/PostgreSQL

### **Installation**

1. **Cloner et installer les dépendances**
```bash
# Dépendances PHP
composer install

# Dépendances Node.js
npm install
```

2. **Configuration**
```bash
# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate
```

3. **Base de données**
```bash
# Configurer la DB dans .env
# Puis lancer les migrations
php artisan migrate
```

4. **Démarrage du développement**
```bash
# Terminal 1 - Laravel
php artisan serve

# Terminal 2 - Vite (assets)
npm run dev
```

## 📦 **Commandes Utiles**

### **Développement**
```bash
npm run dev          # Mode développement avec HMR
npm run build        # Build de production
npm run preview      # Prévisualisation du build
```

### **Code Quality**
```bash
npm run lint         # ESLint
npm run format       # Prettier
npm run types        # Vérification TypeScript
```

### **Laravel**
```bash
php artisan make:controller ArticleController
php artisan make:model Article -m
php artisan make:request ArticleRequest
```

## 🎯 **Structure des Pages**

### **Page d'Accueil**
- Section hero avec CTA
- Statistiques de l'application
- Fonctionnalités principales
- Appel à l'action

### **Layout Public**
- Header avec navigation
- Barre de recherche
- Favoris
- Footer complet
- Menu mobile responsive

## 📱 **Responsive Design**

Le boilerplate est entièrement responsive avec :
- Mobile-first approach
- Navigation mobile avec menu hamburger
- Grilles adaptatives
- Images responsives
- Touch-friendly interactions

## 🔐 **Authentification**

Le système d'authentification Laravel Breeze est intégré avec :
- Pages de connexion/inscription stylées
- Vérification email
- Réinitialisation de mot de passe
- Protection CSRF

## 🎨 **Personnalisation**

### **Couleurs et Thème**
Modifiez les variables CSS dans `resources/css/app.css` :

```css
:root {
  --primary: oklch(0.205 0 0);        /* Couleur principale */
  --secondary: oklch(0.97 0 0);       /* Couleur secondaire */
  --accent: oklch(0.97 0 0);          /* Couleur d'accent */
}
```

### **Composants shadcn/ui**
Ajoutez de nouveaux composants :

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

## 📚 **Bonnes Pratiques Incluses**

### **React/TypeScript**
- Composants fonctionnels avec hooks
- Props typées avec TypeScript
- Gestion d'état locale et globale
- Performance optimisée

### **Laravel**
- Controllers suivant les standards
- Validation avec Form Requests
- Eloquent ORM pour la DB
- Middleware personnalisés

### **CSS/Tailwind**
- Classes utilitaires
- Composants réutilisables
- Variables CSS pour la cohérence
- Responsive design

## 🔧 **Configuration Avancée**

### **Ajout de Composants UI**

1. **Créer un nouveau composant**
```tsx
// resources/js/components/ui/my-component.tsx
import { cn } from '@/lib/utils'

interface MyComponentProps {
  className?: string
  children: React.ReactNode
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn('my-component-base-classes', className)}>
      {children}
    </div>
  )
}
```

2. **Créer un nouveau hook**
```tsx
// resources/js/hooks/use-my-hook.ts
import { useState, useEffect } from 'react'

export function useMyHook(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  
  useEffect(() => {
    // Logique du hook
  }, [value])
  
  return { value, setValue }
}
```

### **Ajout de Pages**

1. **Créer le contrôleur Laravel**
```php
// app/Http/Controllers/MyController.php
<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class MyController extends Controller
{
    public function index()
    {
        return Inertia::render('my-page', [
            'data' => $this->getData()
        ]);
    }
}
```

2. **Créer la page React**
```tsx
// resources/js/pages/my-page.tsx
import { Head } from '@inertiajs/react'
import { PagePropsWithData } from '@/types/global'

interface MyPageProps extends Record<string, unknown> {
  data: any[]
}

export default function MyPage({ data }: PagePropsWithData<MyPageProps>) {
  return (
    <>
      <Head title="Ma Page" />
      <div>
        {/* Contenu de la page */}
      </div>
    </>
  )
}
```

3. **Ajouter la route**
```php
// routes/web.php
Route::get('/my-page', [MyController::class, 'index'])->name('my-page');
```

## 🤝 **Contribution**

Ce boilerplate est conçu pour être :
- **Extensible** - Facilement modifiable
- **Maintenable** - Code propre et documenté
- **Performant** - Optimisé pour la production
- **Moderne** - Technologies récentes

## 📄 **Licence**

MIT License - Libre d'utilisation pour vos projets personnels et commerciaux.

---

**Développé avec ❤️ pour la communauté Laravel & React** 