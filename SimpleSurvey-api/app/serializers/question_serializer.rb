class QuestionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :answer, :survey_id
end
