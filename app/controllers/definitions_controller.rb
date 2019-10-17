class DefinitionsController < ApplicationController
  before_action :authenticate_user,  only: [:create, :update, :destroy]
  before_action :authorize_as_admin, only: [:destroy]


	def index
		@definitions = Definition.where(entry_id: params[:entry_id])
		render json: @definitions.to_json
	end

  # Show will implicitly be passed an id in the params which can be accessed by params[:id]
  def show
    @definition = Definition.where(id: params[:id]).first
    render json: @definition.to_json
  end


  def create 
    @definition = Definition.new(
      definition: params[:definition],
      usage: params[:usage],
      usage_translation: params[:usage_translation],
      tag_list: params[:tag_list]
    )
    @definition.entry_id = params[:entry_id]
    # @definition.user_id = current_user.id
    @definition.save
    render json: @definition.to_json
  end

  def update 
    @definition = Definition.find(params[:id])
    @definition.update(
      definition: params[:definition],
      usage: params[:usage],
      usage_translation: params[:usage_translation],
      tag_list: params[:tag_list]
    )
    # @definition.user_id = current_user.id
    render json: @definition.to_json
  end

  def destroy
    @definition = Definition.find(params[:id])
    @definition.destroy
    render json: @definition.to_json
  end

  def get_tags
  	tag_ids = Tagging.where(definition_id: params[:id]).pluck('tag_id')
  	@tags = Tag.find(tag_ids)
  	render json: @tags.to_json
  end

  def get_tag_list
    @definition = Definition.find(params[:id])
    @tag_list = @definition.tag_list
    render json: @tag_list.to_json
  end

end

