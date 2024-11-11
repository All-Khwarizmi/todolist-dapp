Structure et Organisation


Ajouter un dossier types ou interfaces pour centraliser les types TypeScript communs
Créer un dossier constants pour les valeurs constantes réutilisables
Ajouter un dossier config pour centraliser les configurations (API, env, etc.)
Potentiellement ajouter un dossier services pour les services externes


Dépendances


Ajouter @hookform/resolvers pour la validation des formulaires avec Zod
Intégrer next-themes pour une meilleure gestion du dark mode
Considérer date-fns ou dayjs pour la manipulation des dates
Éventuellement ajouter react-hot-toast ou sonner pour les notifications


Configuration


Ajouter un .env.example
Configurer commitlint pour standardiser les messages de commit
Ajouter tsconfig.paths.json pour une meilleure gestion des alias
Mettre en place un docker-compose.yml basique


Tests


Ajouter des tests exemples pour chaque couche
Configurer msw pour mocker les appels API dans les tests
Ajouter cypress pour les tests E2E
Mettre en place playwright pour les tests de navigation