ActiveAdmin.register Entry do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :phrase, :pinyin, :view_count
  #
  # or
  #
  # permit_params do
  #   permitted = [:phrase, :pinyin, :view_count]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
