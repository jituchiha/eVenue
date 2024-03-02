from flask import Flask, request, jsonify, render_template, flash, redirect, url_for, session
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo,MongoClient
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from datetime import datetime, timedelta
from bson import ObjectId
import jwt
import os, requests


app = Flask(__name__)
CORS(app)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'evenueproject@gmail.com'
app.config['MAIL_PASSWORD'] = 'khwsihrbrhsvmrqx'


mail = Mail(app)

app.config["SECRET_KEY"] = "asdfghjklpoiuytrewqzxcvbnm1245789630"
app.config["MONGO_URI"] = "mongodb+srv://nipotdar:niks1234@cluster0.sfi1ax8.mongodb.net/test"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
collection = mongo.db.venues
collection1 = mongo.db.users
collection2 = mongo.db.organize_events

email_chat=""
password_chat=""

# @app.route('/home', methods = ["GET"])
# def home():
#     # sess = request.json.get("session")
#     # print(sess)
#     print(session)
#     if session:
#         if 'firstname' in session:
#             firstname = session['firstname']
#             email = session['email']
#     else:
#         firstname = ""
#         email = ""
#     print(email)
#     response = {
#         "session": session,
#         "firstname": firstname,
#         "email": email
#     }
#     return response

@app.route('/login', methods=["POST"])
def login():
    global email_chat,password_chat
    email = request.json.get('email')
    password = request.json.get('password')
    response = {
        "email": email,
        "password": password,
        "message": "Received Details"
    }   

    found_user = mongo.db.users.find_one({"email": email})
    if found_user:
        if bcrypt.check_password_hash(found_user['password'], password):
            email_chat=email
            password_chat=password

            session['firstname'] = found_user['firstname']
            session['lastname'] = found_user['lastname']
            session['email'] = found_user['email']
            session['_id'] = str(found_user['_id'])

            response = {
                "email": email,
                "password": password,
                "session": session['firstname'],
                "message": "Login Successful"
            }   
        
        else:
            response = {
               "message": "Wrong Password. Try Again."
            }
    else:

        response = {
            "message": "User not found"
        }

    requests.get('https://api.chatengine.io/users/me/', 
        headers={ 
            "Project-ID": "f9e9b244-4209-448f-b36d-a1725d2d01eb",
            "User-Name": email,
            "User-Secret": password,
            
        }
    )

    print(session)
    return response
    
@app.route('/register', methods=["POST"])
def register():
    firstname = request.json.get("firstname")
    lastname = request.json.get("lastname")
    phone = request.json.get("phone")
    email = request.json.get("email")
    password = request.json.get("password")
    usertype = request.json.get("usertype")
    organize = request.json.get("organized_events")

    print("USER DEETS: " + firstname + ' ' + lastname)

    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')

    mongo.db.users.insert_one({
        "firstname": firstname,
        "lastname": lastname,
        "phone": phone,
        "usertype": usertype,
        "email": email,
        "password": hash_pass,
        "organized_events":organize
    })
    
    response = {
        "name": firstname + lastname,
        "message": "RECEIVED CREDS"
    }

    requests.post('https://api.chatengine.io/users/', 
        data={
            "username":email,
             "secret": password,
            "email": email,
            "first_name": firstname,
            "last_name": lastname,
        },
        headers={ "Private-Key": "87b98b15-6aa9-4245-ac7f-3a8af4755f07" }
    )

    return response

"""
@app.route('/profile')
def profile():
    if 'email' in session:
        return {
            "session_email": session['email']
        }
    else:
        return {
            "session_email": ""
        }
"""
   
@app.route('/logout')
def logout():
    session.clear()

    return {
        "message": "Logout successful"
    }



@app.route("/data")
def get_documents():

    name=request.args.get('name',default=None)
    location=request.args.get('location',default=None)
    capacity=request.args.get('capacity',default=None)
    search_query=request.args.get('search_query',default=None)
  
    query={}

    if search_query:
        regex = { '$regex': search_query, '$options': 'i' }
        query = {'$or': [{ 'name': regex },{ 'location': regex }]}
    if name:
        sports_list = name.split(',')
        query["name"]={"$in": sports_list}
    if location:
        sports_list = location.split(',')
        query["location"]={"$in": sports_list}
    if capacity:
        sports_list = capacity.split(',')
        int_list = list(map(int, sports_list))
        query["capacity"]={"$in": int_list}

    print(query)
    
    documents = list(collection.find(query))
    
    # convert from BSON to JSON format by converting all the values for the keys to string
    json_docs = []
    for doc in documents:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)


    return jsonify(json_docs)

# @app.route('/getvenues')
# def get_venues():
#     docs = list(collection.find())

#     json_docs = []
#     for doc in docs:
#         json_doc = {}
#         for key, value in doc.items():
#             json_doc[key] = str(value)
#         json_docs.append(json_doc)

#     return jsonify(json_docs)

@app.route('/forgot password',methods=["POST"])
def forgot_password():
    email=request.json.get('email')
    userfind=collection1.find_one({"email":email})

    if(userfind!=None):
        user=str(userfind["_id"])
        EXPIRATION_TIME = 5 * 60

        payload = {
                'email': email,
                'exp': datetime.utcnow() + timedelta(seconds=EXPIRATION_TIME)
        }
        token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
        
        text="Reset Password Link"
        msg = Message(text,
                    sender="evenueproject@gmail.com",
                    recipients=[email])
        msg.body="This link will be only valid for 5 mins http://localhost:3000/resetpassword/"+user+"/"+token
        mail.send(msg)
    else:
        return "User does not exist"
    
    return 'Email sent'

@app.route("/resetpassword",methods=["POST"])
def reset_password():
    id=request.json.get("_id")
    password=request.json.get("password")

    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')

    collection1.find_one_and_update(
            { "_id": ObjectId(id) },
            {"$set": {"password": hash_pass}}
        )
    return "Password updated successfully"


@app.route('/profile')
def profile():
    if 'email' in session:
        return {
            "session_email": session['email'],
            "_id": session["_id"]
        }
    else:
        return {
            "session_email": "",
            "_id": ""
        }

@app.route('/profile_data')
def profile_data():
    #id=ObjectId(session['_id'])
    id=ObjectId('64326399da5ce04ddb9d4456')
    userfind=collection1.find_one({"_id":id})
    print(userfind)
    userfind['_id'] = str(userfind['_id'])


    document = list(userfind["organized_events"])

    #print(document)

    
    json_docs = []
    for doc in document:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)
    
    
    
    document1={
        "firstname":userfind["firstname"],
        "lastname":userfind["lastname"],
        "email":userfind["email"],
        "organized_events":json_docs
    }
    

    #print(document1)
    
    return jsonify(document1)

@app.route('/update_user_details',methods=["POST"])
def update_user():
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    age = request.json.get('age')
    gender = request.json.get('gender')
    city = request.json.get('city')
    state = request.json.get('state')

    #id=ObjectId(session['_id'])

    collection1.find_one_and_update(
            { "_id": ObjectId(id) },
            {"$set": {"firstname": first_name, "lastname": last_name, "age":age, "gender":gender, "city":city, "state":state}}
        )

    return "user details updated successfully"


@app.route('/create_events',methods=["POST"])
def create_events():
    name = request.json.get('name')
    description=request.json.get("description")
    address=request.json.get("address")
    location=request.json.get("location")
    date=request.json.get("date")
    time=request.json.get("time")
    capacity=request.json.get("capacity")
    organizer=request.json.get("organizer")
    id=request.json.get("_id")

    collection2.insert_one({"name":name,
                            "description":description,
                            "address":address,
                            "location":location,
                            "date":date,
                            "time":time,
                            "capacity":capacity,
                            "organizer":organizer})
    
    document = collection2.find_one({"name":name})


    collection1.find_one_and_update(
        {"_id": ObjectId('64326399da5ce04ddb9d4456')},
        {"$push": {"organized_events": document}}
        )
    
    return "event created successfully"

@app.route("/chat_authentication")
def get_chats():
    global email_chat,password_chat
    return jsonify({"email":email_chat,"password":password_chat})

if __name__ == '__name__':
    app.secret_key = "asdfghjklpoiuytrewqzxcvbnm1245789630"
    #app.run(debug = True)
    app.run(host="0.0.0.0",port=8080,debug=True)