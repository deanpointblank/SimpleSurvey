class QuestionsController < ApplicationController
    def index
        questions = Question.all
        render json: QuestionSerializer.new(questions)
    end

    def show
        question = Question.find_by(id: params[:id])
        render json: QuestionSerializer.new(question)
    end
    
    def create
        questions = Question.all
        survey = Survey.find_by(id: params['surveyQuestions'][0]['survey_id'])

        params['surveyQuestions'].shift
        params['surveyQuestions'].each do |question|
            survey.questions.create(name: params[:name], answer: params[:values], question_type: params[:type])
        end

        render json: QuestionSerializer.new(questions)
    end

    def update
        question = Question.find_by(id: params[:id])
        question.update(params)
        render json: QuestionSerializer.new(question)
    end

    def destroy
        question = Question.find_by(id: params[:id])
        question.destroy
    end
end
