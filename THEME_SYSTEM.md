# 🎨 Système de Design - Guide Complet

## Vue d'ensemble

Notre système de design utilise **Tailwind CSS 4** avec un système complet de variantes de couleurs (50-950) et des classes utilitaires avancées pour créer des interfaces modernes et cohérentes.

### 🌈 Palettes de Couleurs Disponibles

#### **Primary** - Bleu sophistiqué
```tsx
// Couleurs principales pour les éléments importants
bg-primary-50   // Très clair
bg-primary-100  // Clair
bg-primary-200  // ...
bg-primary-500  // Standard
bg-primary-600  // Foncé
bg-primary-950  // Très foncé
```

#### **Secondary** - Gris élégant
```tsx
// Couleurs secondaires pour les éléments de support
bg-secondary-100  text-secondary-600  border-secondary-300
```

#### **Accent** - Violet moderne
```tsx
// Couleurs d'accent pour les éléments décoratifs
bg-accent-500  hover:bg-accent-600  shadow-accent-500/25
```

#### **Success** - Vert nature
```tsx
// Couleurs pour les confirmations et états positifs
bg-success-50  text-success-700  border-success-300
```

#### **Warning** - Orange chaleureux
```tsx
// Couleurs pour les alertes et avertissements
bg-warning-100  text-warning-800  border-warning-400
```

#### **Info** - Cyan frais
```tsx
// Couleurs pour les informations
bg-info-50  text-info-600  border-info-200
```

---

## 🛠️ Classes Utilitaires Personnalisées

### **Glassmorphism**
```tsx
// Effet verre léger
<div className="glass">

// Effet verre intense
<div className="glass-strong">
```

### **Dégradés Pré-définis**
```tsx
// Dégradé principal
<div className="gradient-primary">

// Dégradé secondaire
<div className="gradient-secondary">

// Dégradé accent
<div className="gradient-accent">
```

### **Ombres Colorées**
```tsx
// Ombres avec la couleur de la palette
<div className="shadow-primary">    // Ombre bleue
<div className="shadow-secondary">  // Ombre grise
<div className="shadow-accent">     // Ombre violette
<div className="shadow-success">    // Ombre verte
<div className="shadow-warning">    // Ombre orange
<div className="shadow-info">       // Ombre cyan
```

### **Effets de Halo**
```tsx
// Effet de halo lumineux
<div className="glow-primary">     // Halo bleu
<div className="glow-secondary">   // Halo gris
<div className="glow-accent">      // Halo violet
```

### **Bordures Dégradées**
```tsx
// Bordures avec dégradé
<div className="border-gradient-primary">  // Bordure bleue dégradée
<div className="border-gradient-accent">   // Bordure violette dégradée
```

---

## 📝 Exemples d'Utilisation Pratiques

### **Bouton Principal**
```tsx
<button className="
  gradient-primary 
  text-white 
  px-6 py-3 
  rounded-xl 
  shadow-primary 
  hover:shadow-primary 
  hover:scale-105 
  transition-all duration-300
">
  Action Principale
</button>
```

### **Carte avec Glassmorphism**
```tsx
<div className="
  glass 
  border-gradient-primary 
  rounded-2xl 
  p-6 
  hover:glow-primary 
  transition-all duration-300
">
  <h3 className="text-primary-800 font-semibold mb-2">Titre</h3>
  <p className="text-primary-600">Contenu de la carte</p>
</div>
```

### **Badge de Statut**
```tsx
// Succès
<span className="
  bg-success-100 
  text-success-800 
  px-3 py-1 
  rounded-full 
  text-sm 
  font-medium
">
  Confirmé
</span>

// Avertissement
<span className="
  bg-warning-100 
  text-warning-800 
  px-3 py-1 
  rounded-full 
  text-sm 
  font-medium
">
  En attente
</span>
```

### **Input avec Style Moderne**
```tsx
<input className="
  glass
  border border-primary-200
  focus:border-primary-500
  focus:ring-2
  focus:ring-primary-500/20
  rounded-xl
  px-4 py-3
  transition-all duration-300
" />
```

### **Notification Toast**
```tsx
<div className="
  glass-strong
  bg-success-50/80
  border border-success-200
  rounded-xl
  p-4
  shadow-success
  backdrop-blur-lg
">
  <div className="flex items-center gap-3">
    <div className="bg-success-500 rounded-full p-1">
      <CheckIcon className="w-4 h-4 text-white" />
    </div>
    <p className="text-success-800 font-medium">Action réussie!</p>
  </div>
</div>
```

---

## 🌙 Support du Mode Sombre

Le système s'adapte automatiquement au mode sombre via la classe `.dark` :

```tsx
// Les couleurs s'inversent automatiquement
<div className="bg-primary-100 dark:bg-primary-900">
  <p className="text-primary-800 dark:text-primary-200">
    Texte adaptatif
  </p>
</div>
```

---

## 🔗 Variantes de Couleurs Complètes

Chaque palette dispose de 11 variantes (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950) utilisables avec :

- **Arrière-plans** : `bg-primary-500`, `bg-accent-200`
- **Texte** : `text-primary-700`, `text-success-600`
- **Bordures** : `border-primary-300`, `border-accent-400`
- **Ombres** : `shadow-primary-500/25`, `shadow-accent-400/30`
- **Ring/Focus** : `ring-primary-500`, `focus:ring-accent-400`

---

## 🚀 Démonstration Interactive

Visitez `/theme-demo` en développement pour voir tous les exemples en action !

---

## 💡 Conseils d'Utilisation

### **Hiérarchie des Couleurs**
1. **Primary** : Actions principales, navigation active
2. **Secondary** : Éléments de support, texte secondaire
3. **Accent** : Éléments décoratifs, highlights
4. **Success/Warning/Info** : États et notifications

### **Cohérence Visuelle**
- Utilisez `primary-500` comme couleur de base
- Variez la luminosité (`primary-400`, `primary-600`) pour les états
- Combinez avec les classes utilitaires pour des effets sophistiqués

### **Performance**
- Les couleurs utilisent le format `oklch()` moderne
- Support natif P3 pour des couleurs plus vives
- Rendu optimisé par les navigateurs modernes

---

## 🔧 Technologies Utilisées

- **Tailwind CSS 4** : Framework CSS moderne
- **OKLCH Color Space** : Espace colorimétrique perceptuel
- **CSS Custom Properties** : Variables CSS natives
- **Glassmorphism** : Effets de transparence modernes
- **Motion Support** : Animations fluides intégrées

---

*Pour toute question ou suggestion d'amélioration, n'hésitez pas à consulter la page de démonstration ou à modifier les variables CSS dans `app.css`.* 