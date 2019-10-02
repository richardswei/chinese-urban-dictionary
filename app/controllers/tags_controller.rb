class TagsController < ApplicationController
	def index
	  @tags = Tag.all
	  render json: @tags.to_json
	end

	def show
		@tag = Tag.find(params[:id])
	end
end
