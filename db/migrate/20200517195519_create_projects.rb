class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :cost
      t.integer :employees
      t.integer :contractor_id

      t.timestamps
    end
  end
end
