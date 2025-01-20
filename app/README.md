# /app/README.md

## Presentational Layer - Next.js App Structure

This directory contains purely presentational components and routing logic using Next.js App Router.

```
app/
├── layout.tsx       # Root layout (purely UI)
├── page.tsx         # Landing page
├── globals.css      # Global styles
└── fonts/          # Font assets
```

### Layout and UI Components

All components in this directory should:
- Be purely presentational
- Not contain business logic
- Focus on UI/UX and styling
- Handle layout concerns only

### Next.js Conventions

#### Component Types
- `layout.tsx`: Shared UI layout
- `page.tsx`: Route UI components
- `loading.tsx`: Loading UI states
- `error.tsx`: Error UI handling

#### Layout Considerations
- Keep layouts simple and focused on presentation
- Use shadcn/ui components for consistent styling
- Implement responsive design patterns
- Handle loading and error states elegantly

### Best Practices

- ✅ Focus on UI/UX concerns only
- ✅ Keep business logic in core layer
- ✅ Use layout composition for UI structure
- ✅ Implement proper loading states
- ✅ Handle errors gracefully
- ❌ No direct blockchain interactions
- ❌ No business logic
- ❌ No data fetching

### Current Implementation

```typescript
// layout.tsx - Example of pure UI component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Styling and Theme

- Uses Tailwind CSS for styling
- Implements shadcn/ui components
- Supports dark/light mode
- Responsive design patterns

### Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)