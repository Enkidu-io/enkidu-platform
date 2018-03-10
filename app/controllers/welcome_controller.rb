class WelcomeController < ApplicationController
  
  def home
  	flash[:notice] = "This app is an Alpha and is undergoing changes everyday."
  end

  def index
  end

  def testmodal
  end

end
