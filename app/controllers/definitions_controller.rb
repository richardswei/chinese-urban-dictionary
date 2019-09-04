class DefinitionsController < ApplicationController
	def create 
		@definition = Definition.new(
			definition: params[:definition],
			usage: params[:usage],
			usage_translation: params[:usage_translation],
			tag_list: params[:tag_list]
		)
		@definition.entry_id = params[:entry_id]
		@definition.save
		redirect_to entry_path(@definition.entry)
	end

end
