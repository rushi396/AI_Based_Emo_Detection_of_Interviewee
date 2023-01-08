from App import *
from Processing import *

Logged_in_User={
    "isLogin":False,
    "name":"Shiva",
    "id":""
}
def checkLogin():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"


@App.route("/")
def main():
    global Logged_in_User
    return f"Admin API {Logged_in_User['isLogin']}"


@App.route('/registeruser',methods=['POST','GET'])
def registerUser():
    global Logged_in_User
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        user_data=request.json
        print(user_data)
        SQL_Query=f"SELECT * FROM users WHERE email='{user_data['email'].lower()}' OR phone='{user_data['phone']}'"
        queryExecuter.execute(SQL_Query)
        list_of_users=queryExecuter.fetchall()
        if len(list_of_users)>0:
            print("user already exists")
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({"error":"true"})
        else:
            id=hashlib.md5(user_data['email'].lower().encode('utf-8'))
            id=id.hexdigest()
            password=hashlib.sha1(user_data['password'].encode('utf-8'))
            password=password.hexdigest()
            INSERT_Query=f"INSERT INTO users(id,name,email,password,phone) VALUES('{id}','{user_data['name']}','{user_data['email'].lower()}','{password}','{user_data['phone']}')"
            queryExecuter.execute(INSERT_Query)
            Database_Connection.commit()
            queryExecuter.close()
            Database_Connection.close()
            Logged_in_User["isLogin"]=True
            Logged_in_User["id"]=id
            Logged_in_User["name"]=user_data['name'].split()[0]
            return jsonify({"username":user_data['name'].split()[0]})
    else:
        return "False"

@App.route('/loginuser',methods=['POST','GET'])
def loginUser():
    global Logged_in_User
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        user_data=request.json
        print(user_data)
        password=hashlib.sha1(user_data['password'].encode('utf-8'))
        password=password.hexdigest()
        SQL_Query=f"SELECT * FROM users WHERE email='{user_data['email'].lower()}' AND password='{password}'"
        queryExecuter.execute(SQL_Query)
        user=queryExecuter.fetchall()
        queryExecuter.close()
        Database_Connection.close()
        if len(user)>0:
            user=user[0]
            print("user found")
            Logged_in_User["isLogin"]=True
            Logged_in_User["id"]=user[0]
            Logged_in_User["name"]=user[1]
            return jsonify({"username":user[1].split()[0]})
        else:
            return jsonify({"error":"true"})
    else:
        return "False"

@App.route('/uploaduserfile',methods=['POST','GET'])
def uploadUserFile():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print(request.files['file'])
        file=request.files['file']
        file_name=file.filename
        file_name=file_name.replace("\"","_")
        file_name=file_name.replace("\'","_")
        old_file_name=file_name
        extension=file_name.split(".")[-1]
        print(extension)
        file_name_hash=hashlib.sha1(file_name.encode('utf-8'))
        file_name_hash=file_name_hash.hexdigest()
        file_name=f"{Logged_in_User['id']}{file_name_hash}.{extension}"
        print(file_name)
        file.filename=file_name
        Pre_SQL_Query=f"SELECT * FROM videos WHERE storage_name='{file_name}';"
        queryExecuter.execute(Pre_SQL_Query)
        result=queryExecuter.fetchall()
        if len(result)==0:
            SQL_Query=f"INSERT INTO videos(video_name,storage_name,uploaded_by) VALUES('{old_file_name}','{file_name}','{Logged_in_User['id']}');"
            queryExecuter.execute(SQL_Query)
            Database_Connection.commit()
            print("upload file is running")
            print(file)
            file.save(os.path.dirname(__file__)+f"\\Data\\Videos\\{file_name}")
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({'data':"File is uploaded successfully"})
        else:
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({'data':"File is already present, Please Choose Another file"})
    else:
        return "error"


@App.route("/getuserreport",methods=['POST','GET'])
def getUserReport():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM videos WHERE id={request.json['id']} and uploaded_by='{Logged_in_User['id']}'"
        queryExecuter.execute(SQL_Query)
        details=queryExecuter.fetchall()
        queryExecuter.close()
        Database_Connection.close()
        print(details)
        if len(details)>0:
            report_file_name=details[0][-1]
            with open("./Data/Reports/"+report_file_name,"r") as file:
                report=json.load(file)
                return jsonify({"report":report,"file_name":details[0][1]})
        else:
            return "error"
    else:
        return "error"


@App.route("/getuploadedfilelistofuser",methods=['POST','GET'])
def getUploadedFilesListofUser():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM videos WHERE uploaded_by='{Logged_in_User['id']}';"
        queryExecuter.execute(SQL_Query)
        list_of_videos=queryExecuter.fetchall()
        print(list_of_videos)
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"data":list_of_videos})
    else:
        return "error"