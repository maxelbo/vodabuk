import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

interface Translation {
  lang: string;
  text: string;
}

interface Example {
  lang: string;
  text: string;
}

interface DictionaryEntry {
  word: string;
  lang: string;
  category: string;
  roots?: string[];
  translations: Translation[];
  examples?: Example[];
}

// Create a connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'vodabuk',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function seedDatabase() {
  const client = await pool.connect();

  try {
    console.log('Starting database seeding...');

    // Read the JSON file
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'dictionaryData.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const entries: DictionaryEntry[] = JSON.parse(jsonData);

    console.log(`Found ${entries.length} entries to import`);

    // Start a transaction
    await client.query('BEGIN');

    // Clear existing data
    console.log('Clearing existing data...');
    await client.query('TRUNCATE dictionary CASCADE');

    let processedCount = 0;
    const batchSize = 100;

    // Process entries in batches for better performance
    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);

      for (const entry of batch) {
        // Calculate the first letter
        const letter = entry.word.charAt(0).toLowerCase();

        // Insert the dictionary entry
        const insertDictQuery = `
          INSERT INTO dictionary (word, lang, category, letter, roots)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id
        `;

        const dictResult = await client.query(insertDictQuery, [
          entry.word,
          entry.lang,
          entry.category,
          letter,
          entry.roots || null,
        ]);

        const dictionaryId = dictResult.rows[0].id;

        // Insert translations
        if (entry.translations && entry.translations.length > 0) {
          for (const translation of entry.translations) {
            const insertTransQuery = `
              INSERT INTO translations (dictionary_id, lang, text)
              VALUES ($1, $2, $3)
            `;
            await client.query(insertTransQuery, [
              dictionaryId,
              translation.lang,
              translation.text,
            ]);
          }
        }

        // Insert examples
        if (entry.examples && entry.examples.length > 0) {
          for (const example of entry.examples) {
            const insertExampleQuery = `
              INSERT INTO examples (dictionary_id, lang, text)
              VALUES ($1, $2, $3)
            `;
            await client.query(insertExampleQuery, [dictionaryId, example.lang, example.text]);
          }
        }

        processedCount++;
      }

      // Log progress
      console.log(`Processed ${processedCount} / ${entries.length} entries...`);
    }

    // Commit the transaction
    await client.query('COMMIT');

    console.log('Database seeding completed successfully!');
    console.log(`Total entries imported: ${processedCount}`);

    // Get counts for verification
    const dictCount = await client.query('SELECT COUNT(*) FROM dictionary');
    const transCount = await client.query('SELECT COUNT(*) FROM translations');
    const exCount = await client.query('SELECT COUNT(*) FROM examples');

    console.log('\nVerification:');
    console.log(`Dictionary entries: ${dictCount.rows[0].count}`);
    console.log(`Translations: ${transCount.rows[0].count}`);
    console.log(`Examples: ${exCount.rows[0].count}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('\nSeeding process finished.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
