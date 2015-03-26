class ProfessionalController < ApplicationController

  before_action :authenticate_user!

  def list
    professionals = current_user.professionals
    return render json: professionals
  end

  def create
    professional = Professional.create(professional_params)
    professional.user = current_user
    professional.save!

    return render json: professional
  end

  def update
    professional = Professional.find(params[:id])
    professional.update_attributes(professional_params)
    professional.save

    return render json: professional
  end

  def remove
    professional = Professional.find(params[:id])
    professional.active = false
    professional.save!

    return render json: professional
  end

  private
  def professional_params
    params.require(:professional).permit(:name, :email, :phone)
  end
end
