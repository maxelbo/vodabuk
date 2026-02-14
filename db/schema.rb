# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_02_14_175329) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "examples", force: :cascade do |t|
    t.integer "word_id", null: false
    t.string "lang", null: false
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["word_id"], name: "index_examples_on_word_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "ip_address"
    t.string "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "translations", force: :cascade do |t|
    t.integer "word_id", null: false
    t.string "lang", null: false
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["word_id"], name: "index_translations_on_word_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email_address", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false, null: false
    t.datetime "last_seen_activity_at"
    t.index ["email_address"], name: "index_users_on_email_address", unique: true
  end

  create_table "word_activities", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "word_id"
    t.string "action", null: false
    t.string "word_snapshot", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_word_activities_on_user_id"
    t.index ["word_id"], name: "index_word_activities_on_word_id"
  end

  create_table "words", force: :cascade do |t|
    t.string "lang", null: false
    t.string "word", null: false
    t.text "roots"
    t.string "letter"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lang", "word"], name: "index_words_on_lang_and_word", unique: true
  end

  add_foreign_key "examples", "words"
  add_foreign_key "sessions", "users"
  add_foreign_key "translations", "words"
  add_foreign_key "word_activities", "users"
  add_foreign_key "word_activities", "words"
end
