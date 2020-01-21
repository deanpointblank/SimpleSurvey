class SurveysController < ApplicationController
    def index
        surveys = Survey.all
        render json: SurveySerializer.new(surveys)
    end

    def show
        survey = Survey.find_by(id: params[:id])
        render json: SurveySerializer.new(survey)
    end
    
    def create
        user = User.find_by(id: params[:user_id])
        survey = user.surveys.create(name: params[:name])
        render json: SurveySerializer.new(survey)
    end

    def update
        survey = survey.find_by(id: params[:id])
        survey.update(params)
        render json: QuestionSerializer.new(survey)
    end

    def destroy
        survey = Survey.find_by(id: params[:id])
        survey.destroy
    end
end
