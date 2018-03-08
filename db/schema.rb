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

ActiveRecord::Schema.define(version: 20180307143236) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bid_details", force: :cascade do |t|
    t.integer "bid_id"
    t.integer "user_id"
    t.float "approval_percentage", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "has_voted", default: false
  end

  create_table "bids", force: :cascade do |t|
    t.integer "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "resolution_id"
    t.integer "initiater_id"
    t.jsonb "variables", default: {}, null: false
    t.boolean "active", default: true
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "project_id"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_comments_on_project_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "digital_contracts", force: :cascade do |t|
    t.text "eth_address"
    t.integer "project_id"
    t.boolean "leader_signed", default: false
    t.boolean "user_signed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "bid_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_likes_on_project_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "notification_types", force: :cascade do |t|
    t.text "notification_content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "user_id"
    t.integer "notification_type_id"
    t.datetime "last_clicked"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "notification_description"
    t.bigint "bid_id"
    t.index ["bid_id"], name: "index_notifications_on_bid_id"
  end

  create_table "payment_gateways", force: :cascade do |t|
    t.integer "project_id"
    t.float "price_rate"
    t.text "domain"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "project_users", force: :cascade do |t|
    t.integer "project_id"
    t.integer "user_id"
    t.float "ownership_percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "vesting_period", default: 12
  end

  create_table "projects", force: :cascade do |t|
    t.text "title"
    t.text "description"
    t.integer "ip_ownership_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "unallocated_percentage"
    t.integer "leader_id"
    t.float "treasury_percentage"
    t.text "project_intro"
    t.integer "likes_count", default: 0
    t.integer "comments_count", default: 0
    t.integer "views_count", default: 0
    t.integer "ratings_count", default: 0
    t.integer "view_count", default: 0
  end

  create_table "ratings", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "project_id"
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_ratings_on_project_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "resolutions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.string "taggable_type"
    t.integer "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "linkedin_profile"
    t.string "job_profile"
    t.integer "age"
    t.date "dob"
    t.string "country"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "views", force: :cascade do |t|
    t.bigint "project_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_views_on_project_id"
    t.index ["user_id"], name: "index_views_on_user_id"
  end

  add_foreign_key "comments", "projects"
  add_foreign_key "comments", "users"
  add_foreign_key "likes", "projects"
  add_foreign_key "likes", "users"
  add_foreign_key "ratings", "projects"
  add_foreign_key "ratings", "users"
  add_foreign_key "views", "projects"
  add_foreign_key "views", "users"
end
