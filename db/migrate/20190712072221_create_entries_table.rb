class CreateEntriesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
    	t.string :phrase
    	t.string :pinyin
    	t.integer :view_count
    	t.timestamps
    end
  end
end
