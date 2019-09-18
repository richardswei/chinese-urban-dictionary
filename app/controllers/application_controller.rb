class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
  def configure_permitted_parameters
   devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password, :password_confirmation])
   devise_parameter_sanitizer.permit(:sign_in, keys: [:login, :password, :password_confirmation])
   devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :password, :password_confirmation, :current_password])
  end
      
  def root
  end

  # # before any action happens, it will authenticate the user
  # before_action :authenticate_user!
  
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
