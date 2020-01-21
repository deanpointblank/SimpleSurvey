class User < ApplicationRecord
    has_many :surveys
    has_many :questions, through: :surveys
end
