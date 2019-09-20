class Entry < ApplicationRecord
	has_many :definitions

	def self.search(search)
		if search

			entry_ids_from_definitions = Definition.where('definition LIKE ?', "%#{search}%").pluck('entry_id').uniq
			entry_ids_from_entries = Entry.where('phrase LIKE ?', "%#{search}%").pluck('id').uniq
			entries_from_definitions = Entry.where({id: entry_ids_from_definitions.concat(entry_ids_from_entries)})
			results = entries_from_definitions

			if results
				results
			else
				Entry.all
			end
		else
			Entry.all
		end
	end

end
