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
   

def delete():
    id = int(input("id: "))

    # Data that we will send in post request.
    data = {'id':id }

    # The POST request to our node server
    res = requests.post('http://127.0.0.1:3000/delete', json=data)
    
    # Convert response data to json
    returned_data = res.json() 
    print(returned_data)


def user_choice():
    choice = input("Type number:\n(1) Create\n(2)Delete\n(3)Update\n(4)Read:")
    if choice == '1':
        create()
    elif choice == '2':
        delete()


user_choice()