class CreateSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :surveys do |t|
      t.string :name
      t.string :description
      t.string :results

      t.timestamps
    end
  end
end
