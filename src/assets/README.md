# Image assets

These files are **on-brand placeholder SVGs** (royal blue `#0F4C81` + gold `#D4AF37`)
created so the site renders without errors. They were added because the original
JPEGs were not included when the project was exported from Lovable.

## Replacing with real photos

Drop the real images here using the **same base names**, e.g. `campus.jpg`,
`kindergarten.jpg`, etc. Then update the imports in the route files to point at
`.jpg` again (a find-and-replace of `.svg"` → `.jpg"` across `src/routes` works):

Files that import these assets:
- `src/routes/index.tsx`        — hero-students, campus, kindergarten, ict-lab, science, graduation, sports, cultural, library, excursion
- `src/routes/about.tsx`        — campus
- `src/routes/academics.tsx`    — kindergarten, ict-lab, science
- `src/routes/gallery.tsx`      — graduation, sports, excursion, science, cultural, kindergarten, library, ict-lab, campus
- `src/routes/news.tsx`         — graduation, sports, science, cultural, ict-lab

Recommended source dimensions: 1200×800 (3:2); the hero image 1920×1280.
