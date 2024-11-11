# NextJS Modern Template

Un template moderne et optimisé pour le développement d'applications web, conçu avec une architecture clean et les meilleures pratiques actuelles.

## 🎯 Objectifs du Template

- **Architecture Propre**: Séparation claire des responsabilités selon les principes de la Clean Architecture
- **Performance**: Optimisé pour le SEO et les Core Web Vitals
- **Maintenabilité**: Structure de code claire et testable
- **Developer Experience**: Configuration complète des outils de développement

## 🛠 Stack Technique

### Core
- **[Next.js 14](https://nextjs.org/)**: Framework React avec App Router et Server Components
- **[TypeScript](https://www.typescriptlang.org/)**: Typage statique pour une meilleure maintenabilité
- **[React 18](https://reactjs.org/)**: Dernière version avec Hooks et Concurrent Features

### State Management & Data Fetching
- **[Zustand](https://zustand-demo.pmnd.rs/)**: Gestion d'état minimaliste et performante
- **[TanStack Query](https://tanstack.com/query)**: Gestion optimisée des requêtes et du cache
- **[Zod](https://zod.dev)**: Validation de schémas TypeScript-first

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)**: Utilitaire CSS avec JIT compiler
- **[shadcn/ui](https://ui.shadcn.com/)**: Composants réutilisables et accessibles
- **[class-variance-authority](https://cva.style/)**: Gestion des variants de composants
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)**: Fusion intelligente des classes Tailwind
- **[Lucide Icons](https://lucide.dev/)**: Icônes modernes et personnalisables

### Testing
- **[Vitest](https://vitest.dev/)**: Framework de test moderne et rapide
- **[Testing Library](https://testing-library.com/)**: Tests centrés sur l'utilisateur
- **[Jest](https://jestjs.io/)**: Support additionnel pour les tests

### Developer Experience
- **[ESLint](https://eslint.org/)**: Linting avec règles TypeScript
- **[Prettier](https://prettier.io/)**: Formatage de code consistant
- **[Husky](https://typicode.github.io/husky/)**: Git hooks automatisés
- **[lint-staged](https://github.com/okonet/lint-staged)**: Linting des fichiers staged

## 📁 Structure du Projet

```
.
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Layout racine
│   └── page.tsx         # Page d'accueil
├── src/
│   ├── core/            # Logique métier
│   │   ├── entities/    # Modèles de données
│   │   ├── repositories/# Interfaces de données
│   │   └── use-cases/   # Logique métier
│   ├── infrastructure/  # Implémentation technique
│   └── ui/             # Composants React
└── lib/                # Utilitaires partagés
```

## 🚀 Démarrage Rapide

```bash
# Installation des dépendances
pnpm install

# Développement
pnpm dev

# Tests
pnpm test

# Build production
pnpm build
```

## 🧪 Testing

Le projet utilise Vitest pour les tests unitaires et d'intégration :

```bash
# Lancer tous les tests
pnpm test

# Mode watch
pnpm test:watch
```

## 📝 Conventions de Code

- **TypeScript**: Strict mode activé
- **Import Aliases**: Chemins d'import simplifiés avec `@/`
- **Components**: Un composant par fichier
- **Testing**: Tests côté composants et logique métier
- **State**: Zustand pour l'état global, React Query pour les données serveur

## 🎨 Design System

Le projet utilise shadcn/ui pour les composants UI :

- Composants accessibles (ARIA)
- Thème personnalisable
- Support dark/light mode
- Animations fluides

## 🔒 Clean Architecture

L'architecture suit les principes SOLID :

1. **Core**: Logique métier pure
2. **Infrastructure**: Implémentation technique
3. **UI**: Composants et hooks React
4. **App**: Routes et pages Next.js

## 📚 Documentation

- `/src/core/README.md`: Documentation de la logique métier
- `/src/infrastructure/README.md`: Documentation technique
- `/src/ui/README.md`: Guide des composants

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

MIT