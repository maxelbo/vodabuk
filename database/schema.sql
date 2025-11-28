-- Create the dictionary table
CREATE TABLE IF NOT EXISTS dictionary (
  id SERIAL PRIMARY KEY,
  word VARCHAR(255) NOT NULL,
  lang VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  letter CHAR(1),
  roots TEXT[], -- Array of roots if present
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the translations table
CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  dictionary_id INTEGER NOT NULL REFERENCES dictionary(id) ON DELETE CASCADE,
  lang VARCHAR(50) NOT NULL,
  text TEXT NOT NULL
);

-- Create the examples table
CREATE TABLE IF NOT EXISTS examples (
  id SERIAL PRIMARY KEY,
  dictionary_id INTEGER NOT NULL REFERENCES dictionary(id) ON DELETE CASCADE,
  lang VARCHAR(50) NOT NULL,
  text TEXT NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_dictionary_word ON dictionary(word);
CREATE INDEX IF NOT EXISTS idx_dictionary_lang ON dictionary(lang);
CREATE INDEX IF NOT EXISTS idx_dictionary_word_lang ON dictionary(word, lang);
CREATE INDEX IF NOT EXISTS idx_translations_dictionary_id ON translations(dictionary_id);
CREATE INDEX IF NOT EXISTS idx_translations_lang ON translations(lang);
CREATE INDEX IF NOT EXISTS idx_examples_dictionary_id ON examples(dictionary_id);
