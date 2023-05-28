from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

# from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Tsai0670qup6@127.0.0.1/History'
db = SQLAlchemy(app)
CORS(app)


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    displayedTime = db.Column(db.String(30), nullable=False)
    title = db.Column(db.String(500), nullable=True)
    subtitle = db.Column(db.String(500), nullable=True)
    content = db.Column(db.String(1000), nullable=False)

    def __repr__(self):
        return f"Event: {self.content}"
    
    def __init__(self, content):
        self.content = content

def format_event(event):
    return {
        "title": event.displayedTime,
        "cardTitle": event.title,
        "cardSubtitle": event.subtitle,
        "cardDetailedText": event.content
    }


# # set header after every request
# @app.after_request
# def after_request(response):
#     header = response.headers
#     header['Access-Control-Allow-Origin'] = '*'
#     header['Access-Control-Allow-Headers'] = '*'
#     header['Access-Control-Allow-Methods'] = '*'
#     header['Content-type'] = 'application/json'
#     header['Cache-control'] = 'no-cache'  # general content cache
#     # header['Access-Control-Max-Age'] = 30  # preflight response cache
#     return response


@app.route('/')
def hello():
    return 'Hey!!!'

@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {"events": event_list}

if __name__ == '__main__':
    app.run()

