# Users API

## Getting started
Necessary sofwares to run this project:
    
    - docker
    - docker-compose

To start the server is necessary to run:

``docker-compose up``

By default the server will be created on port 3000, it can be changed on .env file.

## Available endpoints

    - Login: POST localhost:3000/session
    - Create User: POST localhost:3000/users
        - {"email": "test@teste.com", "password": "123456", "first_name": "Jhon", "last_name": "Doe"}
    - Find user [Authentication required]: GET localhost:3000/users/{user_id}
    - Update user [Authentication required]: PUT localhost:3000/users/{user_id}
        - {"email": "test@teste.com", "first_name": "Jhon", "last_name": "Doe"}
    - Delete user [Authentication required]: DELETE localhost:3000/users/{user_id}