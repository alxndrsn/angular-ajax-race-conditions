require 'rubygems'
require 'sinatra'
require 'json'

configure do
	mime_type :json, 'application/json'
end

get '/' do
	send_file File.join(settings.public_folder, 'index.html')
end

get "/data" do
	data = [
		{id:1, name:'one', details:'111'},
		{id:2, name:'two', details:'222'},
		{id:3, name:'three', details:'333'}
	]
	content_type :json
	data.to_json
end

get "/name/:id" do
	data = [
		{id:1, name:'one', details:'111'},
		{id:2, name:'two', details:'222'},
		{id:3, name:'three', details:'333'}
	]
	content_type :json
	random_delay_up_to 6
	name = data.find {|d| d[:id].to_s == params['id'] }[:name]
	{name:name}.to_json
end

get "/details/:id" do
	data = [
		{id:1, name:'one', details:'111'},
		{id:2, name:'two', details:'222'},
		{id:3, name:'three', details:'333'}
	]
	content_type :json
	random_delay_up_to 6
	details = data.find {|d| d[:id].to_s == params['id'] }[:details]
	{details:details}.to_json
end

def random_delay_up_to(seconds)
	sleep 1 + Random.rand(seconds)
end
