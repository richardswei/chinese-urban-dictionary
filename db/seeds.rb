# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password', username: 'admin', admin: true)
Entry.create!([
  {phrase: "王八蛋", pinyin: "Wang2 Ba1 Dan4", view_count: 3},
  {phrase: "六六六", pinyin: "liu liu liu", view_count: 1},
  {phrase: "Wow", pinyin: "Wau4", view_count: nil},
])
Definition.create!([
  {definition: "asd", usage: "asd", usage_translation: "asd", entry_id: 2, user_id:1},
  {definition: "1", usage: "阿斯顿", usage_translation: "1", entry_id: 2, user_id:1},
  {definition: "asshole", usage: "他是个王八蛋.", usage_translation: "he IS OLE", entry_id: 1, user_id:1},
  {definition: "wowqow", usage: "阿达山大", usage_translation: "asd1", entry_id: 1, user_id:1},
  {definition: "asdasda", usage: "阿斯达阿达山大的阿斯达的", usage_translation: "asdad1", entry_id: 1, user_id:1},
  {definition: "an asshole", usage: "他是一个王八蛋", usage_translation: "He is a an asshole", entry_id: 3, user_id:1},
  {definition: "incredibly elite", usage: "他真六六六", usage_translation: "He is really elite", entry_id: 3, user_id:1},
  {definition: "adad", usage: "阿斯顿", usage_translation: "adad", entry_id: 3, user_id:1}
])
Tag.create!([
  {name: "tag1"},
  {name: "tag2"},
  {name: "tag3"}
])
Tagging.create!([
  {tag_id: 1, definition_id: 1},
  {tag_id: 2, definition_id: 2},
  {tag_id: 3, definition_id: 2},
])
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?