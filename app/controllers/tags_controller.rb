class TagsController < ApplicationController
	def index
	  @tags = Tag.where(definition_id: params[:definition_id])
	  render json: @tags.to_json
	end

	def show
		@tag = Tag.find(params[:id])
		render json: @tag
	end

	def get_relevant_definitions
		definition_ids = Tagging.where(tag_id: params[:id]).pluck('definition_id')
		unique_definitions = Definition.where(id: definition_ids).uniq { |p| p.entry_id }
		render json: unique_definitions, :include => {:entry => {:only => [:phrase, :pinyin]}}
	end

end