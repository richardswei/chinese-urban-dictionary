class DefinitionsController < ApplicationController
	def create 
		@definition = Definition.new(
			definition_params
		)
		@definition.entry_id = params[:entry_id]
		@definition.save
		redirect_to entry_path(@definition.entry)
	end

	def definition_params
		params.require(:definition).permit(:definition, :usage, :usage_translation)
	end
end
