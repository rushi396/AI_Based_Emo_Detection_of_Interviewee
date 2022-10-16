from flask import Flask,render_template,jsonify,request,redirect

admin_login_details={
    "islogin":True,
    "id":None,
    "name":None,
}
user_login_details={
    "islogin":True,
    "id":None,
    "name":None,
}

app=Flask(__name__)
@app.route("/")
def index():

    return render_template('index.html')

@app.route("/user")
def user():
    global admin_login_details,user_login_details
    if user_login_details['islogin']==True:
        return render_template('/Components/User/User_Dashboard.html')
    else:
        return redirect("/")

@app.route("/admin")
def admin():
    global admin_login_details,user_login_details
    if admin_login_details['islogin']==True:
        return render_template('/Components/Admin/Admin_Dashboard.html')
    else:
        return redirect("/")


@app.route("/logout")
def logout():
    global admin_login_details,user_login_details
    admin_login_details=user_login_details={
    "islogin":False,
    "id":None,
    "name":None,
    }
    return redirect("/")




@app.route("/savethefile",methods=["POST","GET"])
def saveTheFile():
    if request.method=="POST":
        print(request.files)
        file=request.files['file']
        print(file.filename)
        file.save(f"C:\\Users\\Sumit\\Desktop\\Emo_Detection\\Result\\Inputs\\{file.filename}");
        return jsonify({"response":"Success"})
    else:
        return jsonify({"response":"Error"})




if __name__=="__main__":
    app.run(debug=True)
