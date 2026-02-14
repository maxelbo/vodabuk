class CreateWordActivities < ActiveRecord::Migration[8.0]
  def change
    create_table :word_activities do |t|
      t.references :user, null: false, foreign_key: true
      t.references :word, null: true, foreign_key: true
      t.string :action, null: false
      t.string :word_snapshot, null: false

      t.timestamps
    end
  end
end
