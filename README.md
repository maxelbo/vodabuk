# Vödabuk

[Vödabuk](https://vodabuk.com) is a Volapük dictionary application created for the International Volapük Society. It provides an easy-to-use interface to explore and manage over 8,000 words in the Volapük language.

## Features

- Browse and search the Volapük dictionary
- Filter words by letter
- View translations and usage examples
- Interface available in English, Esperanto, and Volapük
- Admin panel for managing words and tracking edit activity
- JSON API for programmatic access

## Sources

The English translations are based on the combined works of the late Ralph Midgley (1929–2024), Guvan of the Volapük Community and Honorary Academician of the International Volapük Society. It draws from his "Volapük-English Dictionary" and "English-Volapük Dictionary", both revised in 2010, and his translation of "Vödabuk Volapüka pro Deutänapükans" by Arie de Jong (1931), which was revised and completed from 2012–2022 by Cifal Hermann Philipps. It also includes additional examples extracted from sample texts from Volapük Vifik, and readings from volapük.com.
The Esperanto translations are based on "Vortaro Volapük–Esperanto kaj Esperanto–Volapük" by André Cherpillod.

## Tech Stack

- Ruby 3.4.1
- Rails 8.0
- PostgreSQL
- Hotwire (Turbo + Stimulus)
- Pagy for pagination

## Getting Started

### Prerequisites

- Ruby 3.4.1
- PostgreSQL

### Installation

```sh
git clone https://github.com/maxelbo/vodabuk-api.git
cd vodabuk-api
bundle install
```

### Database Setup

```sh
rails db:create
rails db:migrate
rails db:seed
```

### Running the Server

```sh
bin/dev
```

The app will be available at http://localhost:3000.

## API

The JSON API is available under `/api/v0/volapuk/words` and supports listing, showing, creating, and updating words, as well as filtering by root and letter.

## License

This project is licensed under the MIT License.
