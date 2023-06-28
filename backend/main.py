import base64

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
# memo  uvicorn main:app --reload

from models import stable_diffusion


app = FastAPI()

@app.get("/")
async def root():
    images = stable_diffusion.generate_image()
    json_compatible_image_data = jsonable_encoder(images[0], custom_encoder={bytes: lambda v: base64.b64encode(v).decode('utf-8')})
    return {"image_data": json_compatible_image_data}