User.create!([
  {id: 1, email: 'admin@example.com', password: 'password', password_confirmation: 'password', username: 'admin', role: 'admin'},
  {id: 2, email: 'diana@example.com', password: 'password', password_confirmation: 'password', username: 'wonderwoman', role: 'admin'},
  {id: 3, email: 'bruce@example.com', password: 'password', password_confirmation: 'password', username: 'batman', role: 'admin'},
  {id: 4, email: 'peter@example.com', password: 'password', password_confirmation: 'password', username: 'spiderman', role: 'admin'},
  {id: 5, email: 'tony@example.com', password: 'password', password_confirmation: 'password', username: 'ironman', role: 'admin'},
  {id: 6, email: 'ororo@example.com', password: 'password', password_confirmation: 'password', username: 'storm', role: 'admin'},
  {id: 7, email: 'bro@example.com', password: 'password', password_confirmation: 'password', username: 'broman', role: 'admin'},

])
Entry.create!([
  {id: 1, phrase: "王八蛋", pinyin: "Wang2 Ba1 Dan4", view_count: 5},
  {id: 2, phrase: "六六六", pinyin: "liu liu liu", view_count: 1},
  {id: 3, phrase: "阿", pinyin: "ah", view_count: 5},
  {id: 4, phrase: "土", pinyin: "tu3", view_count: 3},
  {id: 5, phrase: "卖萌 ", pinyin: "mai4 meng2", view_count: 2},
  {id: 6, phrase: "哥们 ", pinyin: "ge1 men", view_count: 2},
  {id: 7, phrase: "也是醉了", pinyin: "ye3 shi4 zui4 le", view_count: 2},
  {id: 8, phrase: "你行你上 ", pinyin: "ni3 xing2 ni3 shang4", view_count: 4},
  {id: 9, phrase: "神 ", pinyin: "shen2", view_count: 7},
  {id: 10, phrase: "裸婚", pinyin: "luo3 hun1", view_count: 1}
])
Definition.create!([
  {id: 1, definition: "asd", usage: "asd", usage_translation: "asd", entry_id: 2, user_id: 2},
  {id: 2, definition: "1", usage: "阿斯顿", usage_translation: "1", entry_id: 2, user_id: 2},
  {id: 3, definition: "asshole", usage: "他是个王八蛋.", usage_translation: "he IS OLE", entry_id: 1, user_id: 2},
  {id: 4, definition: "wowqow", usage: "阿达山大", usage_translation: "asd1", entry_id: 1, user_id: 2},
  {id: 5, definition: "asdasda", usage: "阿斯达阿达山大的阿斯达的", usage_translation: "asdad1", entry_id: 1, user_id: 2},
  {id: 6, definition: "an asshole", usage: "他是一个王八蛋", usage_translation: "He is a an asshole", entry_id: 3, user_id: 2},
  {id: 7, definition: "incredibly elite", usage: "他真六六六", usage_translation: "He is really elite", entry_id: 3, user_id: 2},
  {id: 8, definition: "adad", usage: "阿斯顿", usage_translation: "adad", entry_id: 3, user_id: 2},
  {id: 9, definition: "when it is used as an adjective, it means “unfashionable” or \"basic.\"", usage: "那件衬衫好土，不买它！", usage_translation: "That shirt is so basic, don’t buy it!", entry_id: 4, user_id: 2},
  {id: 10, definition: "to purposefully pretend to be cute", usage: "拍张自拍，卖萌一下!", usage_translation: "Taking a selfie to show off my cuteness!", entry_id: 5, user_id: 2},
  {id: 11, definition: "bros", usage: "Chang是我高中时候的哥们.", usage_translation: "Chang is my bro from high school", entry_id: 6, user_id: 2},
  {id: 12, definition: "a way to gently express your frustrations with someone or something that is completely unreasonable. (lit. \"also drunk\"))", usage: "一瓶水要一百块? 我也是醉了", usage_translation: "A bottle of water costs $100? I must also be drunk", entry_id: 7, user_id: 2},
  {id: 13, definition: "'If you think you can do it, then do it.\" Widely used on Chinese internet forums in during heated arguments about basketball.", usage: "你知道Kobe有多努力吗？你行你上啊！", usage_translation: "Do you know how hard Kobe works? I'd like to see you try it!", entry_id: 8, user_id: 2},
  {id: 14, definition: "commonly used to compliment someone on their godly skills (lit. \"god\")", usage: "最早成就股神称号的是Warren Buffet.", usage_translation: "The first person to achieve the level of “stock market god” is Warren Buffet.", entry_id: 9, user_id: 2},
  {id: 15, definition: "a marriage that is actually centered around love rather than materialism or financial security. (lit. \"naked marriage\")\")", usage: "不度蜜月的“裸婚”在各大中型城市开始流行", usage_translation: "The “naked marriages” that exclude honeymoons has become popular in major and medium-sized cities.", entry_id: 10, user_id: 2}
])

Tag.create!([
  {id:1, name: "tag1"},
])
Tagging.create!([
  {tag_id: 1, definition_id: 1}
])

