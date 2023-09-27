# bookmanagement


Server -> Storing Book Data, User Register, Subsctibers

/users/{id} http://localhost:801/users/1

Routes and Endpoints
/users
POST: Create a new user GET: Get all users Lists

/users/{id}
GET: Get a user by id PUT: Update a user by id DELETE: Delete a user by id (chk if he/she still has an issued book) && (if he/she have any fine to be paid)

// Fine Desciption User => 3 months || 6 months || 12 months

04th aug 2023 4*50 = 200

users/subscription-details/{id}
GET: Get user subscription details

Date of subscription
valid till 3.Fine if any
/books
GET: Get all the books POST: Create/Add a book

/books/{id}
GET: Get a book by its id PUT: Update a book by its id

books/issued
GET: Get all the issued books

/books/issued/withFine
GET: Get all issued books with fine

Subscription Type
Basic (3 months) Standard (6 months) Premium (12 months)

Spread Operator
data ={ name: "rohan", age: 2 }

{ ...data, age: 5, surname: "kinnal" }

data={ name:"rohan", age: 5, surname: "kinnal" }

...each

      "id": "1",
      "name": "John",
      "surname": "Doe",
      "email": "user@email.com",
      "issuedBook": "1",
      "issuedDate": "04/01/2022",
      "returnDate": "05/01/2022",
      "subscriptionType": "Premium",
      "subscriptionDate": "04/01/2022"
...data "surname": "Kinnal"

O/P: "id": "1", "name": "John", "surname": "Kinnal", "email": "user@email.com", "issuedBook": "1", "issuedDate": "04/01/2022", "returnDate": "05/01/2022", "subscriptionType": "Premium", "subscriptionDate": "04/01/2022"

int arr = [20, 21, 22] arr.indexOf(21)




// * Route:/users
// *Method:get
// *Descriptions:get all users
// *Acess:public
// *parameters:none