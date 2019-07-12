class RemoveEntriesTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :entries
  end
end