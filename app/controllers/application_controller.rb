# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def current_user
    ActiveDecorator::Decorator.instance.decorate(super) if super.present?
    super
  end
end
