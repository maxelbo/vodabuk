# Database Setup Guide

This guide explains how to set up PostgreSQL for the Vodabuk dictionary application and seed it with the dictionary data.

## Prerequisites

- PostgreSQL installed and running on your server
- Node.js and npm installed
- Access to a PostgreSQL database

## Step 1: Create the Database

Connect to PostgreSQL and create the database:

```bash
# Connect to PostgreSQL as the postgres user
sudo -u postgres psql

# Create the database
CREATE DATABASE vodabuk;

# Exit psql
\q
```

## Step 2: Set Up the Schema

Run the schema file to create the necessary tables:

```bash
# Using psql command
psql -U postgres -d vodabuk -f database/schema.sql

# Or use npm script
npm run db:setup
```

This will create three tables:
- `dictionary` - stores the main word entries
- `translations` - stores translations for each word
- `examples` - stores usage examples for each word

## Step 3: Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Update the `.env` file with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vodabuk
DB_USER=postgres
DB_PASSWORD=your_password_here
USE_DATABASE=true
```

**Important:** Set `USE_DATABASE=true` to enable database usage instead of the JSON file.

## Step 4: Seed the Database

Import the dictionary data from the JSON file into PostgreSQL:

```bash
npm run db:seed
```

This script will:
1. Read the `src/data/dictionaryData.json` file
2. Clear any existing data in the database
3. Import all dictionary entries, translations, and examples
4. Display progress and verification counts

The seeding process may take a few minutes depending on the size of the dictionary.

## Step 5: Verify the Setup

You can verify the data was imported correctly by connecting to the database:

```bash
psql -U postgres -d vodabuk
```

Then run some queries:

```sql
-- Check total number of words
SELECT COUNT(*) FROM dictionary;

-- Check total translations
SELECT COUNT(*) FROM translations;

-- Check total examples
SELECT COUNT(*) FROM examples;

-- View a sample entry
SELECT d.word, d.category, t.lang, t.text
FROM dictionary d
LEFT JOIN translations t ON d.id = t.dictionary_id
WHERE d.word = 'a'
LIMIT 10;
```

## Step 6: Run the Application

Start the Next.js development server:

```bash
npm run dev
```

The application will now fetch data from PostgreSQL instead of the JSON file.

## Switching Between Database and JSON

You can switch between using the database and the JSON file by changing the `USE_DATABASE` environment variable:

- `USE_DATABASE=true` - Use PostgreSQL database
- `USE_DATABASE=false` - Use JSON file (default)

## Troubleshooting

### Connection Issues

If you get connection errors, verify:
1. PostgreSQL is running: `sudo systemctl status postgresql`
2. Database credentials in `.env` are correct
3. PostgreSQL is configured to accept connections from your host

### Permission Issues

If you get permission errors, ensure your PostgreSQL user has the necessary privileges:

```sql
GRANT ALL PRIVILEGES ON DATABASE vodabuk TO your_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

### Re-seeding the Database

If you need to re-seed the database, just run the seed script again:

```bash
npm run db:seed
```

The script automatically clears existing data before importing.

## Database Schema

### dictionary table
- `id` - Primary key
- `word` - The dictionary word
- `lang` - Language (e.g., "volapuk")
- `category` - Word category (e.g., "noun", "verb")
- `letter` - First letter of the word (for indexing)
- `roots` - Array of root words (optional)
- `created_at` - Timestamp

### translations table
- `id` - Primary key
- `dictionary_id` - Foreign key to dictionary
- `lang` - Translation language
- `text` - Translation text

### examples table
- `id` - Primary key
- `dictionary_id` - Foreign key to dictionary
- `lang` - Example language
- `text` - Example text
