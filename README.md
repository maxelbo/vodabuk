# Vödabuk

[Vödabuk](https://vodabuk.com) is a Volapük dictionary application for the International Volapük Society. It provides tools to search and manage a database of more than 9,000 Volapük words.

### Historical Context
Volapük was published in 1879 by **Fr. Johann Martin Schleyer**, a German Catholic priest. Fr. Schleyer designed the language to facilitate international communication. At its height in the late 1880s, the movement included over 200,000 speakers and dozens of publications. This project digitizes that lexicon for modern use.

## Features

* **Search & Filter:** Browse the dictionary by letter or search terms.
* **Trilingual UI:** Interface available in English, Esperanto, and Volapük.
* **Linguistic Data:** View translations, usage examples, and word roots.
* **Admin Panel:** Tools for word management and activity tracking.
* **JSON API:** Programmatic access to the dictionary database.

## Sources

The English translations are based on the combined works of the late **Ralph Midgley** (1929–2024), Guvan of the Volapük Community and Honorary Academician of the International Volapük Society. It draws from his "Volapük-English Dictionary" and "English-Volapük Dictionary", both revised in 2010, and his translation of "Vödabuk Volapüka pro Deutänapükans" by **Arie de Jong** (1931), which was revised and completed from 2012–2022 by Cifal **Hermann Philipps**. It also includes additional examples extracted from sample texts from Volapük Vifik, and readings from volapük.com.
The Esperanto translations are based on "Vortaro Volapük–Esperanto kaj Esperanto–Volapük" by **André Cherpillod**.

## Tech Stack

- **Language**: Ruby 3.4.1
- **Framework:** Rails 8.0 (Hotwire: Turbo + Stimulus)
- **Database**: PostgreSQL
- **Pagination**: Pagy

## API

The JSON API is available under `/api/v0/volapuk/words` and supports listing, showing, creating, and updating words, as well as filtering by root and letter.

## License

This project is licensed under the MIT License.
