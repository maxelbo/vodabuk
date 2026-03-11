class ChangeExamplesSchema < ActiveRecord::Migration[8.0]
  def up
    change_table :examples do |t|
      t.remove :lang
      t.remove :text
      t.string :volapuk
      t.string :english
      t.string :esperanto
      t.string :note
    end
  end

  def down
    change_table :examples do |t|
      t.remove :volapuk
      t.remove :english
      t.remove :esperanto
      t.remove :note
      t.string :lang, null: false, default: "english"
      t.string :text
    end
  end
end
