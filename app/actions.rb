# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  Contact.all.to_json
end 

post '/contacts/create' do
  response = Hash.new
  response[:result] = false
  contact = Contact.new(firstname: params[:firstname], lastname: params[:lastname], email: params[:email])

  if contact.save
    response[:result] = true
    response[:id] = contact.id
  end

  response.to_json
end

delete '/delete' do 
  Contact.destroy(id)
end