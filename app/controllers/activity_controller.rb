class ActivityController < ApplicationController
  before_action :require_admin

  def index
    @pagy, @activities = pagy(WordActivity.recent.includes(:user, :word))
    Current.user.update_column(:last_seen_activity_at, Time.current)
  end

  private

  def require_admin
    redirect_to root_path unless Current.user&.admin?
  end
end
