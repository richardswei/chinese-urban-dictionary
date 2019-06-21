class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
    	t.string :chinese_word
    	t.string :pinyin
    	t.text :definition
    	t.text :body
    	t.timestamps
    end
  end
end
