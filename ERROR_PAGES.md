# 🚨 Système de Pages d'Erreur

Ce projet inclut un système complet de pages d'erreur personnalisées utilisant Laravel 12, Inertia.js et React avec Tailwind CSS.

## 📋 **Pages d'Erreur Disponibles**

| Code | Nom | Description | Déclencheur |
|------|-----|-------------|-------------|
| **400** | Bad Request | Requête mal formée | Données invalides dans la requête |
| **401** | Unauthorized | Accès non autorisé | Authentification requise |
| **403** | Forbidden | Accès interdit | Permissions insuffisantes |
| **404** | Not Found | Page introuvable | Route inexistante |
| **405** | Method Not Allowed | Méthode non autorisée | Mauvaise méthode HTTP |
| **419** | Page Expired | Page expirée | Token CSRF expiré |
| **422** | Unprocessable Entity | Données non valides | Erreurs de validation |
| **429** | Too Many Requests | Trop de requêtes | Rate limiting dépassé |
| **500** | Internal Server Error | Erreur serveur | Exception serveur |
| **503** | Service Unavailable | Service indisponible | Maintenance/surcharge |

## 🏗️ **Architecture**

### **Composant Principal**
```tsx
// resources/js/components/error-page.tsx
<ErrorPage
  code="404"
  title="Page introuvable"
  description="La page demandée n'existe pas..."
  icon={<FileQuestion />}
  suggestions={["Vérifiez l'URL", "Retournez à l'accueil"]}
  showRefresh={true}
  showContact={true}
/>
```

### **Pages Spécifiques**
```
resources/js/pages/errors/
├── 400.tsx - Bad Request
├── 401.tsx - Unauthorized  
├── 403.tsx - Forbidden
├── 404.tsx - Not Found
├── 405.tsx - Method Not Allowed
├── 419.tsx - Page Expired
├── 422.tsx - Unprocessable Entity
├── 429.tsx - Too Many Requests
├── 500.tsx - Internal Server Error
└── 503.tsx - Service Unavailable
```

### **Handler d'Exception**
Le fichier `bootstrap/app.php` contient la logique pour rediriger automatiquement vers les bonnes pages d'erreur.

## 🧪 **Tests et Développement**

### **Page de Test**
En mode développement, vous pouvez accéder à :
```
http://localhost:8000/test-errors
```

Cette page permet de :
- ✅ Voir toutes les pages d'erreur disponibles
- ✅ Tester chaque erreur individuellement
- ✅ Vérifier le design et la fonctionnalité

### **Test Manuel**
```bash
# Tester une erreur 404
curl http://localhost:8000/page-inexistante

# Tester une erreur 500 (via le contrôleur de test)
curl http://localhost:8000/test-errors/500
```

## 🎨 **Personnalisation**

### **Modifier une Page d'Erreur**
```tsx
// resources/js/pages/errors/404.tsx
import ErrorPage from '@/components/error-page'
import { FileQuestion } from 'lucide-react'

export default function Error404() {
  return (
    <ErrorPage
      code="404"
      title="Votre titre personnalisé"
      description="Votre description personnalisée"
      icon={<FileQuestion className="w-full h-full" />}
      suggestions={[
        "Suggestion personnalisée 1",
        "Suggestion personnalisée 2"
      ]}
      showRefresh={false}
      showContact={true}
    >
      {/* Contenu personnalisé optionnel */}
      <div>Contenu additionnel</div>
    </ErrorPage>
  )
}
```

### **Ajouter une Nouvelle Page d'Erreur**

1. **Créer la page React :**
```tsx
// resources/js/pages/errors/418.tsx
import ErrorPage from '@/components/error-page'
import { Coffee } from 'lucide-react'

export default function Error418() {
  return (
    <ErrorPage
      code="418"
      title="Je suis une théière"
      description="Le serveur refuse de préparer du café parce qu'il est une théière."
      icon={<Coffee className="w-full h-full" />}
    />
  )
}
```

2. **Ajouter au handler d'exception :**
```php
// bootstrap/app.php
$errorPages = [
    // ... autres erreurs
    418 => 'errors/418',
];
```

3. **Ajouter au contrôleur de test :**
```php
// app/Http/Controllers/ErrorTestController.php
$supportedCodes = [400, 401, 403, 404, 405, 418, 419, 422, 429, 500, 503];
```

## 🎯 **Fonctionnalités**

### **Composant ErrorPage Props**
```tsx
interface ErrorPageProps {
  code: string              // Code d'erreur (ex: "404")
  title: string            // Titre principal
  description: string      // Description de l'erreur
  suggestions?: string[]   // Liste de suggestions
  showRefresh?: boolean    // Bouton "Actualiser"
  showContact?: boolean    // Bouton "Contact"
  icon?: React.ReactNode   // Icône personnalisée
  children?: React.ReactNode // Contenu personnalisé
}
```

### **Fonctionnalités Automatiques**
- ✅ **Navigation** : Boutons retour, accueil
- ✅ **Responsive** : Design adaptatif mobile/desktop
- ✅ **Accessibilité** : Support des lecteurs d'écran
- ✅ **SEO** : Titres et meta appropriés
- ✅ **UX** : Animations et transitions fluides

## 🔧 **Configuration Avancée**

### **Désactiver en Production**
Les routes de test sont automatiquement désactivées en production :
```php
// routes/web.php
if (app()->environment(['local', 'testing'])) {
    // Routes de test uniquement en dev
}
```

### **Logging des Erreurs**
```php
// Pour logger les erreurs personnalisées
Log::error('Erreur 404', [
    'url' => request()->url(),
    'user_id' => auth()->id(),
    'ip' => request()->ip()
]);
```

### **Erreurs API vs Web**
Le handler vérifie automatiquement le type de requête :
```php
if (!$request->expectsJson()) {
    // Afficher la page d'erreur React
} else {
    // Retourner JSON pour les API
}
```

## 🚀 **Déploiement**

### **Vérifications Pré-Production**
```bash
# Tester toutes les pages en local
php artisan tinker
abort(404); // Teste la page 404
abort(500); // Teste la page 500

# Compiler les assets
npm run build

# Vérifier que les routes de test sont désactivées
php artisan route:list | grep test-errors
```

### **Variables d'Environnement**
```env
# .env.production
APP_ENV=production
APP_DEBUG=false
```

## 🎨 **Styles et Thème**

### **Classes Tailwind Utilisées**
- `bg-gradient-to-br from-gray-50 to-gray-100` - Arrière-plan dégradé
- `shadow-xl border-0 bg-white/80 backdrop-blur-sm` - Carte glassmorphism
- `text-8xl md:text-9xl font-bold text-gray-200` - Code d'erreur géant

### **Variables CSS Personnalisables**
Les couleurs suivent le thème défini dans `resources/css/app.css` :
```css
:root {
  --primary: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  /* etc... */
}
```

## 📱 **Support Mobile**

Toutes les pages d'erreur sont optimisées pour mobile :
- ✅ Touch-friendly buttons
- ✅ Responsive typography
- ✅ Adaptive layouts
- ✅ Fast loading

## 🔗 **Liens Utiles**

- [Documentation Laravel Exception Handling](https://laravel.com/docs/errors)
- [Documentation Inertia.js](https://inertiajs.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Créé avec ❤️ pour une meilleure expérience utilisateur lors des erreurs !** 