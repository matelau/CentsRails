# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141126180242) do

  create_table "colis", force: true do |t|
    t.float    "cost_of_living", limit: 24
    t.float    "transportation", limit: 24
    t.float    "groceries",      limit: 24
    t.float    "goods",          limit: 24
    t.float    "health_care",    limit: 24
    t.float    "utilities",      limit: 24
    t.float    "housing",        limit: 24
    t.string   "location"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "colis", ["location"], name: "location_UNIQUE", unique: true, using: :btree

  create_table "completeds", force: true do |t|
    t.integer  "user_id"
    t.string   "section"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "queries", force: true do |t|
    t.integer  "user_id"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "scalars", force: true do |t|
    t.integer  "user_id"
    t.float    "misc",           limit: 24
    t.float    "housing",        limit: 24
    t.float    "books",          limit: 24
    t.float    "insurance",      limit: 24
    t.float    "utilities",      limit: 24
    t.string   "type"
    t.string   "name"
    t.float    "food",           limit: 24
    t.float    "savings",        limit: 24
    t.float    "loans",          limit: 24
    t.float    "tuition",        limit: 24
    t.float    "healthcare",     limit: 24
    t.float    "debt",           limit: 24
    t.float    "transportation", limit: 24
    t.boolean  "public"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.float    "debt",       limit: 24
    t.float    "books",      limit: 24
    t.float    "savings",    limit: 24
    t.string   "email"
    t.string   "password"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "weather_records", force: true do |t|
    t.float    "high",       limit: 24
    t.float    "low",        limit: 24
    t.float    "average",    limit: 24
    t.integer  "coli_id"
    t.string   "month",      limit: 10, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "weather_records", ["coli_id"], name: "index_weather_records_on_coli_id", using: :btree

end
