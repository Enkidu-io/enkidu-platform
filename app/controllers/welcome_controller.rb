class WelcomeController < ApplicationController
  
  def home
  	flash[:warning] = "This app is an Alpha and is undergoing changes everyday. If you find something broken or missing, please check back again in a day or two."
  end

  def index
  end

  def testmodal
  end

end
