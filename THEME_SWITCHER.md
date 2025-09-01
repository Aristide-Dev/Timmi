# 🎨 Système de Changement de Thème Dynamique

## Vue d'ensemble

Le système de changement de thème dynamique permet aux utilisateurs de personnaliser l'apparence de l'application en temps réel. Il inclut des présets prédéfinis et un créateur de thème personnalisé.

## 🚀 Fonctionnalités

### **Présets de Thèmes Prédéfinis**
- **Thème par Défaut** : Bleu + Violet
- **Thème Nature** : Vert + Cyan  
- **Thème Coucher de Soleil** : Orange + Rouge
- **Thème Océan** : Cyan + Bleu
- **Thème Galaxie** : Violet + Rose
- **Thème Forêt** : Vert + Jaune

### **Créateur de Thème Personnalisé**
- Sélecteur de couleur principale (8 couleurs disponibles)
- Sélecteur de couleur accent (8 couleurs disponibles)
- Nom personnalisé pour le thème
- Application et sauvegarde instantanées

### **Fonctionnalités Avancées**
- 💾 **Sauvegarde automatique** dans localStorage
- 📥 **Export de thème** en format JSON
- 🔄 **Réinitialisation** au thème par défaut
- 🎯 **Application temps réel** des changements
- 🌟 **Transitions fluides** entre les thèmes

## 🛠️ Utilisation

### **Page de Démonstration**
Accédez à `/theme-demo` (en mode développement) pour :
- Visualiser tous les présets disponibles
- Créer votre thème personnalisé
- Tester les effets en temps réel
- Exporter votre configuration

### **Hook useTheme()**
```tsx
import { useTheme } from '@/hooks/use-theme';

function MonComposant() {
  const { 
    currentTheme,     // Thème actuel
    presets,          // Thèmes prédéfinis
    changeTheme,      // Changer de thème
    createCustomTheme,// Créer thème personnalisé
    resetTheme,       // Réinitialiser
    availableColors   // Couleurs disponibles
  } = useTheme();

  return (
    <div>
      <p>Thème actuel : {currentTheme.name}</p>
      <button onClick={() => changeTheme(presets.nature)}>
        Thème Nature
      </button>
    </div>
  );
}
```

### **Navigation**
Le lien "🎨 Thème Demo" apparaît automatiquement dans le menu de navigation en mode développement.

## 🎨 Couleurs Disponibles

### **Palette de Couleurs**
| Couleur | Emoji | Usage Recommandé |
|---------|-------|------------------|
| Blue    | 🔵    | Professionnel, corporate |
| Purple  | 🟣    | Créatif, moderne |
| Green   | 🟢    | Nature, écologique |
| Orange  | 🟠    | Énergique, chaleureux |
| Pink    | 🩷    | Doux, artistique |
| Cyan    | 🟦    | Frais, technologique |
| Red     | 🔴    | Passion, urgence |
| Yellow  | 🟡    | Joie, optimisme |

### **Combinaisons Suggérées**
- **Professionnel** : Blue + Purple
- **Nature** : Green + Cyan
- **Chaleureux** : Orange + Yellow
- **Moderne** : Purple + Pink
- **Énergique** : Red + Orange
- **Frais** : Cyan + Blue

## 🔧 Implémentation Technique

### **Architecture**
```
📁 hooks/
  └── use-theme.ts          # Hook principal
📁 pages/
  └── theme-demo.tsx        # Interface de démonstration
📁 css/
  └── app.css              # Variables CSS et transitions
```

### **Persistance**
- **Stockage** : localStorage avec clé `TIMMI-theme`
- **Format** : JSON avec métadonnées (timestamp, version)
- **Restauration** : Automatique au chargement de la page

### **Variables CSS Modifiées**
Le système modifie dynamiquement ces variables CSS :
```css
--primary-50 à --primary-950
--accent-50 à --accent-950
--primary (couleur principale)
--accent (couleur accent)
```

### **Transitions**
Transitions CSS automatiques de 300ms pour tous les changements de couleur.

## 📱 Interface Utilisateur

### **Panneau de Contrôle**
- **En-tête** : Nom du thème actuel + boutons d'action
- **Présets** : Grille de 6 thèmes prédéfinis avec aperçu
- **Customizer** : Interface pliable pour création personnalisée

### **Interactions**
- **Clic** : Changement instantané de thème
- **Hover** : Prévisualisation des effets
- **Check** : Indicateur visuel du thème actif
- **Export** : Téléchargement automatique du fichier JSON

## 🎯 Cas d'Usage

### **Pour les Développeurs**
```tsx
// Changer programmatiquement
changeTheme(presets.ocean);

// Créer un thème personnalisé
createCustomTheme('green', 'yellow', 'Mon Thème Vert');

// Écouter les changements
useEffect(() => {
  console.log('Nouveau thème:', currentTheme.name);
}, [currentTheme]);
```

### **Pour les Utilisateurs**
1. Accéder à la page de démonstration
2. Tester les présets en cliquant dessus
3. Utiliser le customizer pour créer un thème unique
4. Exporter la configuration si souhaité
5. Le thème est automatiquement sauvegardé

## 🚦 États et Gestion d'Erreur

### **États Possibles**
- ✅ **Chargé** : Thème appliqué avec succès
- 🔄 **Transition** : Changement en cours
- ⚠️ **Erreur** : Retour au thème par défaut
- 💾 **Sauvegardé** : Persistance localStorage réussie

### **Gestion d'Erreur**
- **localStorage indisponible** : Mode dégradé sans sauvegarde
- **JSON corrompu** : Réinitialisation automatique
- **Couleur invalide** : Retour aux valeurs par défaut

## 🔮 Évolutions Futures

### **Fonctionnalités Prévues**
- 🌙 **Mode sombre** : Inversion automatique des couleurs
- 🎨 **Éditeur avancé** : Sélecteur de couleur HSL
- 🔗 **Partage** : URLs avec thème intégré
- 👥 **Thèmes utilisateur** : Sauvegarde serveur
- 📊 **Analytics** : Thèmes les plus populaires

### **Optimisations**
- **Performance** : Lazy loading des couleurs
- **Bundle** : Séparation du code de thème
- **Cache** : Optimisation des transitions CSS
- **A11y** : Contraste automatique et accessibilité

---

## 📞 Support

Pour toute question ou suggestion d'amélioration :
- 🔗 Testez sur `/theme-demo`
- 📚 Consultez `THEME_SYSTEM.md` pour la documentation générale
- 🐛 Signalez les bugs via les issues GitHub

*Le système de thème dynamique est conçu pour être extensible et performant. N'hésitez pas à proposer de nouvelles couleurs ou fonctionnalités !* 