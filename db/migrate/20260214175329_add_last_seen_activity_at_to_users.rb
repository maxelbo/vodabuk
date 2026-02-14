class AddLastSeenActivityAtToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :last_seen_activity_at, :datetime
  end
end
