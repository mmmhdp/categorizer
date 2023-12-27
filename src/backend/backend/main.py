from fastapi import FastAPI
from pydantic import BaseModel

from backend import parser
from ml_backend import nlp_model


app = FastAPI()


class Url(BaseModel):
    url: str


@app.get("/")
async def root():
    return {"message": "Furry"}


@app.post("/predict/")
async def predict(site_url: Url):
    pars = parser.Parser()
    corpus = pars.get_en_data_for_model_by_url(site_url.url)
    model = nlp_model.Model()
    topic_label = model.predict(corpus)
    return {"topic": topic_label}
