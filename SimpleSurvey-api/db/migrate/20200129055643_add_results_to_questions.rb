class AddResultsToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :results, :string
  end
end
