class SurveySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :results, :questions
end
