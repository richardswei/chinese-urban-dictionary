class EntriesController < ApplicationController
  # This will render the view location at views/entries/index
  # You can modify that to display anything you want, even corgis.
  def index
    @count = Entry.count
    @corgi_url = "http://placecorgi.com/260/180"
  end

  # Show will implicitly be passed an id in the params which can be accessed by params[:id]
  def show
    @entry = Entry.where(id: params[:id]).first
    # NB: @entry might be nil if we were passed an invalid id.
  end

  def new
    @entry = Entry.new
  end

  def edit
    @entry = Entry.where(id: params[:id]).first
  end

  def create
    @entry = Entry.new(
        phrase: params[:entry][:phrase],
        pinyin: params[:entry][:pinyin]
      )
    @entry.save
    redirect_to entry_path(@entry)
  end
end
