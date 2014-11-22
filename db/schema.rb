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

ActiveRecord::Schema.define(version: 20141122012158) do

  create_table "colis", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "cost_of_living", limit: 24
    t.float    "transportation", limit: 24
    t.float    "groceries",      limit: 24
    t.float    "goods",          limit: 24
    t.float    "health_care",    limit: 24
    t.float    "utilities",      limit: 24
    t.integer  "location_id"
  end

  add_index "colis", ["location_id"], name: "index_colis_on_location_id", using: :btree

  create_table "locations", force: true do |t|
    t.string   "city_state"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "weather_records", force: true do |t|
    t.float    "high",        limit: 24
    t.float    "low",         limit: 24
    t.float    "average",     limit: 24
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "location_id"
  end

  add_index "weather_records", ["location_id"], name: "index_weather_records_on_location_id", using: :btree

end
