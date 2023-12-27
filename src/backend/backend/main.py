from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from backend import parser, cache_layer
from ml_backend import nlp_model

app = FastAPI()
cache = cache_layer.CacheLayer()


class Url(BaseModel):
    url: str


@app.get("/predict/{pair_id}")
async def get_prediction(pair_id: int):
    if cache.is_cached(pair_id):
        return {"topic": cache.get_topic_by_pair_id(pair_id)}
    raise HTTPException(status_code=404, detail="Cache miss")


@app.post("/predict")
async def predict(site_url: Url):
    pars = parser.Parser()
    corpus = pars.get_en_data_for_model_by_url(site_url.url)
    model = nlp_model.Model()
    topic_label = model.predict(corpus)
    pair_id = cache.save(site_url.url, topic_label)

    if cache.is_cached(pair_id):
        return JSONResponse(
            content={
                "Message": "Page analyzed and cached successfully",
                "data": pair_id}
        )

    return HTTPException(status_code=500, detail="Cache flaw")
