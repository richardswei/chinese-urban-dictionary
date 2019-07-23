class DefinitionsController < ApplicationController
	def create 
		@definition = Definition.new(
			params.require(:definition).
				permit(:definition, :usage, :usage_translation)
		)
		@definition.entry_id = params[:entry_id]
		@definition.save
		redirect_to entry_path(@definition.entry)
	end

end
