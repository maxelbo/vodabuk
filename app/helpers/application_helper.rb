module ApplicationHelper
  include Pagy::Frontend

  def unseen_activity?
    return false unless Current.user&.admin?
    last_seen = Current.user.last_seen_activity_at
    if last_seen
      WordActivity.where("created_at > ?", last_seen).exists?
    else
      WordActivity.exists?
    end
  end
end
