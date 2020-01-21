class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :surveys_taken, :surveys, :questions
end
