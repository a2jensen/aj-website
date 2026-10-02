# Content templates

Starter files for the content collections in `src/content/`. These live outside
`src/` so Astro never builds them.

To add an item, copy the matching template into its collection folder and rename it.
The filename becomes the URL slug:

| Template      | Copy to                  | URL                  |
| ------------- | ------------------------ | -------------------- |
| `project.md`  | `src/content/projects/`  | `/projects/<name>`   |
| `art.md`      | `src/content/art/`       | `/art/<name>`        |
| `note.md`     | `src/content/notes/`     | `/notes/<name>`      |

- Images go in `src/images/`; reference them as `/images/<file>`.
- `order` controls position on the projects/art grids (lower comes first).
- Notes are sorted by `pubDate`, newest first. `description` and `image` are optional.
- Fields are validated by `src/content.config.ts`, so a missing or misspelled field fails the build with an error.
