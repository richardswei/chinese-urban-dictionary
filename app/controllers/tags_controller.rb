class TagsController < ApplicationController
	def index
	  @tags = Tag.where(definition_id: params[:definition_id])
	  render json: @tags.to_json
	end

	def show
		@tag = Tag.find(params[:id])
	end
end
