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
        question = Question.create(name: params[:name], answer: params[:answers], survey_id: params[:survey_id], question_type: params[:question_type])
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
