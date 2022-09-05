from flask import Flask, request, url_for, redirect, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('timer.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="5000")
