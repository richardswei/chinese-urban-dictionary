class DropUsers < ActiveRecord::Migration[5.2]
  def change
  	remove_column :definitions, :user_id
  	drop_table :users
  end
end
