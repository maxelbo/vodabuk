class RemoveNullExamples < ActiveRecord::Migration[8.0]
  def up
    execute "DELETE FROM examples WHERE volapuk IS NULL AND note IS NULL"
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
