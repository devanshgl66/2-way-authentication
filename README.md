# 2-way-authentication
This repo contains my nodejs code for 2 way user authentication
API endpoint:
  localhost:3000/
    show homepage
  localhost:3000/users  --get
    show users
  localhost:3000/users/add_user   --post
    add new user
    req=>username,password
    res=>qr code to be scanned by google authenticator
  localhost:3000/users/login    --post
    login user
    req=>username,password,token (6 digit code from google authenticator)
    res=>user
