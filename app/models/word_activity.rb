class WordActivity < ApplicationRecord
  belongs_to :user
  belongs_to :word, optional: true

  scope :recent, -> { order(created_at: :desc) }
end
