class EntriesController < ApplicationController
  # This will render the view location at views/entries/index
  # You can modify that to display anything you want, even corgis.
  before_action :authenticate_user!, only: [:new, :edit]

  def index
    @entries = Entry.search(params[:search])
  end

  # Show will implicitly be passed an id in the params which can be accessed by params[:id]
  def show
    @entry = Entry.where(id: params[:id]).first
    if (user = current_user).present?
      @entry.increment!(:view_count)
    end
    # NB: @entry might be nil if we were passed an invalid id.
  end


  before_action :configure_permitted_parameters, if: :devise_controller?
  def new
    @entry = Entry.new
  end

  def edit
    @entry = Entry.find(params[:id])
  end

  def update
    @entry = Entry.find(params[:id])
    @entry.update(
      phrase: params[:phrase],
      pinyin: params[:pinyin]
    )
    redirect_to entry_path(@entry)
  end

  def create
    @entry = Entry.new(
        phrase: params[:phrase],
        pinyin: params[:pinyin]
      )
    @entry.save
    redirect_to entry_path(@entry)
  end
end
