class Entry < ApplicationRecord
	has_many :definitions

	def self.search(query)
		if query && query.length>0
			matching_definitions = 
				Definition.where('definition LIKE ?', "%#{query}%").uniq(&:entry_id)
			entries_from_definitions1 = matching_definitions.map { |definition| 
					Hash["entry" => Entry.find(definition.entry_id),  "definition_text" => definition.definition]
			}
			matching_entries = 
				Entry.where('phrase LIKE ?', "%#{query}%")
			entries_from_definitions2 = matching_entries.length>0 ? matching_entries.map { |entry| 

					Hash["entry" => entry,  "definition_text" => entry.definitions.length>0 ? entry.definitions.first.definition : 'a']
			} : []

			results = 
				entries_from_definitions1.concat(entries_from_definitions2)
			if results
				results
			else
				{}
			end
		else
			{}
		end
	end

  
end
