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

ActiveRecord::Schema.define(version: 20150409195329) do


  create_table "amounts", force: true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.boolean  "public"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "value",      limit: 24
    t.string   "category"
  end

  create_table "careers", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "employment_change_volume"
    t.float    "employment_change_percent", limit: 24
    t.integer  "job_openings"
    t.string   "name"
    t.string   "salary"
    t.float    "unemp11",                   limit: 24
    t.float    "unemp12",                   limit: 24
<<<<<<< HEAD
=======
    t.string   "career_code"
    t.float    "sal2003",                   limit: 24
    t.float    "sal2004",                   limit: 24
    t.float    "sal2005",                   limit: 24
    t.float    "sal2006",                   limit: 24
    t.float    "sal2007",                   limit: 24
    t.float    "sal2008",                   limit: 24
    t.float    "sal2009",                   limit: 24
    t.float    "sal2010",                   limit: 24
    t.float    "sal2011",                   limit: 24
    t.float    "sal2012",                   limit: 24
    t.float    "sal2013",                   limit: 24
>>>>>>> scraper/career
  end

  create_table "coli_weather", id: false, force: true do |t|
    t.float  "cost_of_living",        limit: 24
    t.float  "transportation",        limit: 24
    t.float  "groceries",             limit: 24
    t.float  "goods",                 limit: 24
    t.float  "health_care",           limit: 24
    t.float  "utilities",             limit: 24
    t.float  "housing",               limit: 24
    t.string "city"
    t.float  "unemp_rate",            limit: 24
    t.float  "sales_tax",             limit: 24
    t.float  "property_tax",          limit: 24
    t.string "state"
    t.float  "income_tax_min",        limit: 24
    t.float  "income_tax_max",        limit: 24
    t.float  "income_per_capita",     limit: 24
    t.string "month",                 limit: 10
    t.float  "high",                  limit: 24
    t.float  "low",                   limit: 24
    t.float  "avg_unemp_rate",        limit: 53
    t.float  "avg_income_per_capita", limit: 53
  end

  create_table "colis", force: true do |t|
    t.float    "cost_of_living",    limit: 24
    t.float    "transportation",    limit: 24
    t.float    "groceries",         limit: 24
    t.float    "goods",             limit: 24
    t.float    "health_care",       limit: 24
    t.float    "utilities",         limit: 24
    t.float    "housing",           limit: 24
    t.string   "city"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "unemp_rate",        limit: 24
    t.float    "sales_tax",         limit: 24
    t.float    "property_tax",      limit: 24
    t.string   "state"
    t.float    "income_tax_max",    limit: 24
    t.float    "income_tax_min",    limit: 24
    t.float    "income_per_capita", limit: 24
    t.float    "economic_growth",   limit: 24
  end

  create_table "completeds", force: true do |t|
    t.integer  "user_id"
    t.string   "section"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "degrees", force: true do |t|
    t.float    "salary",       limit: 24
    t.float    "unemployment", limit: 24
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "satisfaction", limit: 24
    t.float    "in_field",     limit: 24
    t.float    "recommend",    limit: 24
    t.float    "meaningful",   limit: 24
    t.string   "level"
  end

  create_table "gets", force: true do |t|
    t.integer  "career_id"
    t.integer  "degree_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "gets", ["career_id", "degree_id"], name: "index_gets_on_career_id_and_degree_id", unique: true, using: :btree
  add_index "gets", ["career_id"], name: "index_gets_on_career_id", using: :btree
  add_index "gets", ["degree_id"], name: "index_gets_on_degree_id", using: :btree

  create_table "oauth_access_grants", force: true do |t|
    t.integer  "resource_owner_id", null: false
    t.integer  "application_id",    null: false
    t.string   "token",             null: false
    t.integer  "expires_in",        null: false
    t.text     "redirect_uri",      null: false
    t.datetime "created_at",        null: false
    t.datetime "revoked_at"
    t.string   "scopes"
  end

  add_index "oauth_access_grants", ["token"], name: "index_oauth_access_grants_on_token", unique: true, using: :btree

  create_table "oauth_access_tokens", force: true do |t|
    t.integer  "resource_owner_id"
    t.integer  "application_id"
    t.string   "token",             null: false
    t.string   "refresh_token"
    t.integer  "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at",        null: false
    t.string   "scopes"
  end

  add_index "oauth_access_tokens", ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true, using: :btree
  add_index "oauth_access_tokens", ["resource_owner_id"], name: "index_oauth_access_tokens_on_resource_owner_id", using: :btree
  add_index "oauth_access_tokens", ["token"], name: "index_oauth_access_tokens_on_token", unique: true, using: :btree

  create_table "oauth_applications", force: true do |t|
    t.string   "name",                      null: false
    t.string   "uid",                       null: false
    t.string   "secret",                    null: false
    t.text     "redirect_uri",              null: false
    t.string   "scopes",       default: "", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "oauth_applications", ["uid"], name: "index_oauth_applications_on_uid", unique: true, using: :btree

  create_table "offers", force: true do |t|
    t.integer  "university_id"
    t.integer  "degree_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "queries", force: true do |t|
    t.integer  "user_id"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rates_careers", force: true do |t|
    t.integer  "user_id"
    t.integer  "career_id"
    t.integer  "rating"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rates_majors", force: true do |t|
    t.integer  "user_id"
    t.integer  "degree_id"
    t.integer  "rating"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rates_majors", ["degree_id"], name: "rates_majors_degree_id_fk", using: :btree
  add_index "rates_majors", ["user_id"], name: "rates_majors_user_id_fk", using: :btree

  create_table "rates_schools", force: true do |t|
    t.integer  "rating"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "university_id"
  end

  add_index "rates_schools", ["university_id"], name: "rates_schools_university_id_fk", using: :btree
  add_index "rates_schools", ["user_id"], name: "rates_schools_user_id_fk", using: :btree

  create_table "top_jobs", force: true do |t|
    t.string   "name"
    t.float    "salary",     limit: 24
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "degree_id"
  end

  create_table "universities", force: true do |t|
    t.integer  "size"
    t.integer  "rank"
    t.float    "housing",             limit: 24
    t.string   "state"
    t.string   "name"
    t.float    "grad_rate_6_year",    limit: 24
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "net_cost",            limit: 24
    t.float    "tuition_resident",    limit: 24
    t.float    "tuition_nonresident", limit: 24
    t.string   "image"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "password_digest"
    t.string   "email_type"
    t.string   "primary_color"
    t.string   "secondary_color"
    t.boolean  "prefers_autocomplete"
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

  add_foreign_key "rates_majors", "degrees", name: "rates_majors_degree_id_fk"
  add_foreign_key "rates_majors", "users", name: "rates_majors_user_id_fk"

  add_foreign_key "rates_schools", "universities", name: "rates_schools_university_id_fk"
  add_foreign_key "rates_schools", "users", name: "rates_schools_user_id_fk"

end
