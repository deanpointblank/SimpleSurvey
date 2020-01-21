# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user = User.create(name: "Houston")
survey = user.surveys.create(name: "Where are you from?")
survey.questions.create(name: "What is your country?")
survey.questions.create(name: "Do you like it?")
survey.questions.create(name: "Would you move?")
