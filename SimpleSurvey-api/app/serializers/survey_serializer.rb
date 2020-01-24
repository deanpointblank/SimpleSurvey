class SurveySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :results, :questions
end
