require 'chinese_pinyin'

entries = Entry.all
entries.each do |entry|
	entry.update(pinyin: Pinyin.t(entry.phrase, tonemarks: true))
	entry.save
end
