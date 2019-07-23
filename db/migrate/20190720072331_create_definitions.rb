class CreateDefinitions < ActiveRecord::Migration[5.2]
  def change
    create_table :definitions do |t|
      t.text :definition
      t.text :usage
      t.text :usage_translation
      t.references :entry, foreign_key: true

      t.timestamps
    end
  end
end
