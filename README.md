# backend

# /post
# to register a user
https://gitstatus-app.herokuapp.com/api/auth/register

# /post
# to login 
https://gitstatus-app.herokuapp.com/api/auth/login

# /get
# return user object with an array of favorited github users
https://gitstatus-app.herokuapp.com/api/favorites/users/:id

# /post
# stores a new github username in favorites table and returns updated array of favorites including the new one
https://gitstatus-app.herokuapp.com/api/favorites/users/1

# /put 
# used to update notes column on favorites table used to edit notes column
https://gitstatus-app.herokuapp.com/api/favorites/:id/notes

# /delete
# removes a favorite and reutrns an updated array without the delted 
https://gitstatus-app.herokuapp.com/api/favorites/:id/:favId
#                                            ^^userid^^^^favorite id^^^



