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
        survey = Surver.find_by(id: params[:survey_id])
        question = survey.questions.create(name: params[:name])
        render json: QuestionSerializer.new(question)
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
