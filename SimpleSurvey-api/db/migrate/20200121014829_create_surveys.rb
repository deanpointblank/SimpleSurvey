class CreateSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :surveys do |t|
      t.string :name
      t.string :results
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
