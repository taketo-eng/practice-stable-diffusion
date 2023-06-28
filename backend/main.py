import base64

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
# memo  uvicorn main:app --reload

from models import stable_diffusion


app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    images = stable_diffusion.generate_image(num_of_images=5)
    # binaryデータをbase64に変換してレスポンス
    return {"images": images}
