This is a Node Api which allows users to login and view data according to their roles.
{	Admin: Can View all the data of users.
	Accounts Admin: Can view only accounts data.
	Sales Admin: Can view only sales data.
}

1.Build Setup
	# install dependencies
	npm install

2. Install MongoDB

3. open the project folder in command prompt and Type npm run dev.

4. Created the db with name bitelit and collections names also as bitelit and enter the data according to the data 
   mentioned in "collections" file.

5. Once the server is started and you can check the Api's and check the results in Postman. 
	1. localhost:8000/api/login
	2. localhost:8000/api/show
	3. localhost:8000/api/logout

6. I also have commented code for localhost:8000/api/accounts api if you want to check that as well kindly un-comment that code.
7. To show the complete data db.bitelit.find().pretty()
8. Technologies Used: Node.js, Express.js, MongoDB.

Author: Sanjay Rajpurohit
Contact No: 9462678202
Mail-ID: sanjayrajpurohit36@gmail.com
Skype ID: sanjayrajpurohit36@gmail.com 
