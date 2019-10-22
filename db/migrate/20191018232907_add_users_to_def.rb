class AddUsersToDef < ActiveRecord::Migration[5.2]
	def change
		add_reference :definitions, :user, foreign_key: true

	end
end
