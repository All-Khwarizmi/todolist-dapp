# /app/README.md

## App Router Structure

```
app/
├── (auth)/           # Groupe de routes authentification
│   ├── login/        # Route /login
│   └── signup/       # Route /signup
├── (dashboard)/      # Groupe de routes dashboard
│   └── overview/     # Route /overview
├── api/             # Routes API
├── layout.tsx       # Layout racine
└── page.tsx         # Page d'accueil (/)
```

### Conventions Next.js

- `page.tsx` : Point d'entrée d'une route
- `layout.tsx` : Layout partagé
- `loading.tsx` : État de chargement
- `error.tsx` : Gestion d'erreurs
- `route.ts` : API endpoints
- `(group)/` : Groupe de routes (n'affecte pas l'URL)

### Routes API

Les routes API sont dans `app/api/` et suivent la convention :

- `route.ts` pour définir les handlers HTTP (GET, POST, etc.)
- Utilisation des Response/Request de l'API Next.js

### Bonnes Pratiques

- Un composant par page
- Loading states pour UX optimale
- Error boundaries par section
- Layouts partagés pour code commun

### Liens Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
