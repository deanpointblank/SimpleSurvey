class SurveySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :results, :user_id, :questions
end
