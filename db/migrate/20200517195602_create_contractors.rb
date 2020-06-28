class CreateContractors < ActiveRecord::Migration[6.0]
  def change
    create_table :contractors do |t|
      t.string :firstName
      t.string :lastName
      t.string :email
      t.integer :phoneNum

      t.timestamps
    end
  end
end
