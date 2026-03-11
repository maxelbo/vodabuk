class Example < ApplicationRecord
  belongs_to :word

  validates :volapuk, presence: true, unless: :note?

  def note?
    note.present?
  end

  def display_for(lang_key)
    return note if note?

    translation = case lang_key.to_s
                  when "english" then english
                  when "esperanto" then esperanto
                  else [english, esperanto].compact.join(" / ")
                  end

    translation.present? ? "#{volapuk} = #{translation}" : volapuk
  end
end
