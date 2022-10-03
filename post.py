import requests

# Create
def create():
    fn = input("fn: ")
    ln = input("ln: ")

    # Data that we will send in post request.
    data = {'fn':fn, 'ln':ln}

    # The POST request to our node server
    res = requests.post('http://127.0.0.1:3000/create', json=data)
    
    # Convert response data to json
    returned_data = res.json() 
    print(returned_data)
   
def read():
    res = requests.post('http://127.0.0.1:3000/read')
    returned_data = res.json()
    for i in returned_data:
        print(i)
    user_choice()
    
def update():
    fn = input("fn: ")
    ln = input("ln: ")
    id = int(input("Id: "))

    # Data that we will send in post request.
    data = {'fn':fn, 'ln':ln, 'id':id}

    # The POST request to our node server
    res = requests.post('http://127.0.0.1:3000/update',json=data)
    returned_data = res.json()
    print(returned_data)
    user_choice()

def delete():
    id = int(input("Id: "))

    # Data that we will send in post request.
    data = {'id':id}

    # The POST request to our node server
    res = requests.post('http://127.0.0.1:3000/delete',json=data)
    returned_data = res.json()
    user_choice()
    


def user_choice():
    choice = input("Type number:\n(1) Create\n(2)Delete\n(3)Update\n(4)Read:")
    if choice == '1':
        create()
    if choice == '2':
        read()
    if choice == '3':
        update()
    if choice == '4':
        delete()


user_choice()
