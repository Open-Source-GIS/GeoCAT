class RlasController < ApplicationController
  
  
  def editor_params 
    if !params[:id].nil? && !params[:specie].nil?
      
      @rla = Rla.new
      @rla.specie = params[:specie]
      @rla.data = params[:id]
      redirect_to :controller => "rlas", :action => "editor"
    else
      redirect_to :controller => "main"
    end
  end
  
  def editor
    if (!$rla.nil?)&&(!$file_content.nil?)     
      @rla = $rla    
      @rla_json = $file_content
    else
      redirect_to :controller => "main"
    end
  end
  
  def create
    @rla = Rla.new(params[:rla])

    if validate_rla(params[:rla]["name"])
        # go to Editor PAGE        
        $rla = @rla
        redirect_to :action => "editor"
    else
      render :text => "File wrong"
    end
  end
  
  def show
    render :json =>Rla.all, :callback => params[:callback]
  end

  # Validate RLA method
  def validate_rla(path)
    # invalid_file = false
    
    file = File.open(path, "r")
    file_content_JSON = []
    file_content = []
    
    file.each do |json_string| 
      file_content_JSON << JSON.parse(json_string)
      file_content << json_string
    end
    
    $file_content = file_content[0]
    
    @rla.specie = file_content_JSON[0]["rla"]["specie"]
    @rla.zoom = file_content_JSON[0]["rla"]["zoom"]
    @rla.data = file_content_JSON[0]["rla"]["sources"]
    
    # Get the header     
    # file_content_hash = JSON.parse(file.readline)
    # 
    #  if (file_content_hash == ({'zoom' => nil} || {'specie' => nil})) 
    #     invalid_file = true
    #   else
    #     @rla.zoom = file_content_hash[0]["zoom"].to_i
    #     @rla.specie = file_content_hash[0]["specie"]
    #     @rla.data = {}
    #     file.each do |json_string| 
    #       file_content_hash = JSON.parse(json_string)
    #       @rla.data[file_content_hash[0]["name"]] = file_content_hash 
    #     end
    #     @rla.updated_at = Time.now    
    # end
    
    file.close
    
    return true
    # if (invalid_file == true)
    #      return false
    #  else
    #      return true 
    #  end  
  end
  
  def get_download_url url
    
  end
  # TODO Add validates
  def download_rla
 
    #@rla_download = params[:rla]
      
      # if File.exist?('public/data/data_temp.rla')
      #           respond_to do |format|
      #             format.rla {
      #               send_file 'public/data/data_temp.rla',
      #                 :filename => 'data_temp.rla'
      #               }
      #             end
      #   end      
             
      # file = File.open('./public/data/data_temp.rla', 'r')
      #       file.write(@rla_download)
      #       file.close
      #       
      #       if File.file? file
      #          send_data(File.read(file), :type=> 'application/rla', :disposition => 'attachement')
      #        end
      # file_temp = File.open('./public/data/data_temp.rla', 'w') {
      #   |f| f.write(@rla_download)
      # }
      # File.delete file_temp
      
      # send_file 'public/data/data_temp.rla', :disposition => 'attachment', :stream => false
      
      # send_file 'public/data/data_temp.rla', :type=>"application/rla", :disposition => 'inline'

      @url = get_download_url 'public/data/data_temp.rla'
      
      redirect_to @url

      # Borrar archivo temporal
      # File.delete file

      # render :nothing => true
  end
  
  def upload_rla 
      #render :file => 'app/views/main/index.html'
      render :text => "download RLA"
    end
    
    
  def make_screenshot
    width, height, bmp = Win32::Screenshot.foreground
    img = Magick::Image.from_blob(bmp)[0]
    img.write("./screenshot.png")
  end 
  
end
