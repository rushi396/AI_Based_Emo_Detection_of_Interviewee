from flask import Flask,render_template,jsonify,request,redirect
import numpy
import pandas
import matplotlib.pyplot as pyplot
import seaborn

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import re
import pickle
import joblib


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





@app.route("/text_analysis")
def text_analysis():
    global admin_login_details,user_login_details
    if admin_login_details['islogin']==True:
        return render_template('/Components/Admin/Text_Analysis.html')
    else:
        return redirect("/")

class_list=["sadness","joy","love","anger","fear","surprise"]
word_lemitizer=WordNetLemmatizer()
Regular_expression_definition_for_html_tags=re.compile('<.*?>')
Regular_expression_definition_for_digits=re.compile('\d+\s|\s\d+|\s\d+\s')
Regular_expression_definition_for_links=re.compile('http://\S+|https://\S+')
english_stop_words=stopwords.words('english')
with open('../Models/Text/Vectorizer.pickle',"rb") as f:
    Vectorizer=pickle.load(f)
def preprocessing_of_sentence(text):
    word_to_be_handled=[
    "not",
    "no",
    "very"
    ]
    text=Regular_expression_definition_for_html_tags.sub(r" ",text)
    text=Regular_expression_definition_for_digits.sub(r" ",text)
    text=Regular_expression_definition_for_links.sub(r" ",text)
    punctuations = [".","=","_","<",">",",","!","?","'",'"',":",";","*","-","/","+","%","$","#","@","(",")","[","]","{","}",'\n']
    for i in punctuations:
        text = text.replace(i," ")
    text=text.lower().split()
    text=[word for word in text if word not in english_stop_words and len(word)>1 or word in word_to_be_handled]
    text=[word_lemitizer.lemmatize(word) for word in text]
    Vector=Vectorizer.transform([" ".join(text)])
    return Vector


@app.route('/getresult',methods=['POST','GET'])
def getfinalresult():
    print("getresult is requested")
    if request.method=='POST':
        print("Post Method")
        # print(request.json['input_text'])
        if request.json['input_text']=="":
            return jsonify({"data":"ERROR"})
        else:
            input_=preprocessing_of_sentence(request.json['input_text'])

            svmModel=joblib.load("../Models/Text/svmModel.joblib")
            prediction=class_list[svmModel.predict(input_)[0]]
            return jsonify({"data":prediction})
    else:
        return jsonify({"data":"ERROR"})





















if __name__=="__main__":
    app.run(debug=True)
