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
            survey.questions.create(name: question[:name], answer: question[:values], question_type: question[:type])
        end

        render json: QuestionSerializer.new(questions)
    end

    def update
        questions = Question.all
        params[:results].gsub(/,{/,'~|~{').split('~|~').each do |question_answer|
            if !question_answer.include?("{}")
                qv = JSON.parse(question_answer.gsub(/[\[\]]/, ''))
                question = Question.find_by(id: qv.keys[0].to_i)
                if !!question.results
                    results = question.results + ', ' + qv.values[0]
                else
                    results = qv.values[0]
                end
                question.update(results: results)
            end
        end
        render json: QuestionSerializer.new(questions)
    end

    def destroy
        question = Question.find_by(id: params[:id])
        question.destroy
    end

    private


end

