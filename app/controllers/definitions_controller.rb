class DefinitionsController < ApplicationController
	def index
		@definitions = Definition.all
		render json: @definitions.to_json
	end

  # Show will implicitly be passed an id in the params which can be accessed by params[:id]
  def show
    @definition = Definition.where(id: params[:id]).first
    render json: @definition.to_json
  end
end
