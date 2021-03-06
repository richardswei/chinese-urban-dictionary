class Definition < ApplicationRecord
  belongs_to :entry
  belongs_to :user
  has_many :taggings
  has_many :tags, through: :taggings, dependent: :destroy

  def tag_list
    self.tags.collect do |x|
      x.name
    end.join(", ")
  end

  def tag_list=(tags_to_set)
    p tags_to_set
    tag_names = tags_to_set.split(",").collect{
      |text| text.strip.downcase
    }.uniq
    tag_items = tag_names.collect {
      |name| Tag.find_or_create_by(name: name)
    }
    self.tags = tag_items
  end

end
