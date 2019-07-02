class ApplicationController < ActionController::Base
  def root
  end

  # Sample route that shows you what you want to see.
  # Note the existence of this in routes.rb as well as the view in views/application/corgi.html.erb
  def corgi
    images = [
        "https://img.buzzfeed.com/buzzfeed-static/static/2014-09/23/12/enhanced/webdr10/longform-original-22600-1411489016-22.jpg",
        "https://i.imgur.com/o8v5fF0.jpg",
        "https://i.imgur.com/KSaEDk6.jpg"
    ]
    # Array#sample returns an element of that array at random.
    @image_url = images.sample
  end
end
