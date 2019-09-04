class Definition < ApplicationRecord
  belongs_to :entry
  has_many :taggings
  has_many :tags, through: :taggings

  def tag_list
  	self.tags.collect do |x|
  		x.name
  	end.join(", ")
  end

	def tag_list=(tags_made)
		tag_names = tags_made.split(",").collect{|s| s.strip.downcase}.uniq
		new_or_found_tags = tag_names.collect { |name| Tag.find_or_create_by(name: name) }
		self.tags = new_or_found_tags
	end

end
