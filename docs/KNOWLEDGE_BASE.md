# Updating the Raghad AI Knowledge Base

## Before client documents arrive (developer prep)

1. Sample files live in `sample-data/` (`sample-kb-ar.txt`, `sample-kb-en.txt`).
2. Index them for testing:
   ```bash
   curl -X POST http://localhost:3000/api/rag/index-sample
   ```
3. Requires `OPENAI_API_KEY` in `.env`.

## When client sends documents

1. Place PDF/Word/text files in a secure upload folder (or use the admin upload UI once built).
2. Run the indexing pipeline:
   - Parse document text
   - Chunk with overlap (`src/lib/rag/chunker.ts`)
   - Enrich with dialect synonyms (`src/lib/rag/dialect.ts`)
   - Generate embeddings via OpenAI
   - Store in `DocumentChunk` table (Prisma)

## Adding new documents later

1. Upload the file via dashboard/admin.
2. Trigger re-index for that document ID.
3. Old chunks for that document are replaced.

## Dialect tips

- Saudi/Gulf/Egyptian terms are mapped in `src/lib/rag/dialect.ts`.
- Extend `DIALECT_SYNONYMS` as you discover new local terms from client feedback.

## Environment

Copy `.env.example` to `.env` and fill in:

- `OPENAI_API_KEY` — from client
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — random secret for sessions
