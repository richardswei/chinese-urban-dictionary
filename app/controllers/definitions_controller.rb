class DefinitionsController < ApplicationController
	def create 
		@definition = Definition.new(
			definition: params[:definition],
			usage: params[:usage],
			usage_translation: params[:usage_translation],
			tag_list: params[:tag_list]
		)
		@definition.entry_id = params[:entry_id]
		@definition.user_id = current_user.id
		@definition.save
		redirect_to entry_path(@definition.entry)
	end

	def destroy
		@definition = Definition.find(params[:id])
		@definition.destroy
		redirect_to entry_path(@definition.entry)
	end

	def update
		@definition = Definition.find(params[:id])
		@definition.update(
			definition: params[:definition],
			usage: params[:usage],
			usage_translation: params[:usage_translation],
			tag_list: params[:tag_list]
		)
		redirect_to entry_path(@definition.entry_id)
	end

	def edit
	  @definition = Definition.find(params[:id])
	end
end
