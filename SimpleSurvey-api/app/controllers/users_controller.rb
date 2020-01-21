class UsersController < ApplicationController
    def index
        users = User.all
        render json: UserSerializer.new(users)
    end

    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.new(user)
    end
    
    def create
        user = User.create(name: params[:name])
        render json: UserSerializer.new(User)
    end

    def destroy
        user = User.find_by(id: params[:id])
        user.destroy
    end
end
