import { Pool, QueryResult } from 'pg';
import { DictionaryEntryType } from '@/lib/types';

// Create a connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'vodabuk',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Get all dictionary entries from the database
 */
export async function getDictionaryDataFromDB(): Promise<DictionaryEntryType[]> {
  const client = await pool.connect();

  try {
    // Get all dictionary entries with their translations and examples
    const query = `
      SELECT
        d.id,
        d.word,
        d.lang,
        d.category,
        d.letter,
        d.roots,
        json_agg(
          DISTINCT jsonb_build_object(
            'lang', t.lang,
            'text', t.text
          )
        ) FILTER (WHERE t.id IS NOT NULL) as translations,
        json_agg(
          DISTINCT jsonb_build_object(
            'lang', e.lang,
            'text', e.text
          )
        ) FILTER (WHERE e.id IS NOT NULL) as examples
      FROM dictionary d
      LEFT JOIN translations t ON d.id = t.dictionary_id
      LEFT JOIN examples e ON d.id = e.dictionary_id
      GROUP BY d.id, d.word, d.lang, d.category, d.letter, d.roots
      ORDER BY d.word;
    `;

    const result: QueryResult = await client.query(query);

    // Transform the results to match DictionaryEntryType
    return result.rows.map((row) => ({
      word: row.word,
      lang: row.lang,
      category: row.category,
      letter: row.letter,
      roots: row.roots,
      translations: row.translations || [],
      examples: row.examples || [],
    }));
  } finally {
    client.release();
  }
}

/**
 * Close the database connection pool
 */
export async function closePool(): Promise<void> {
  await pool.end();
}

export default pool;
