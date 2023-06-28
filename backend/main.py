import base64

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

class PromptItem(BaseModel):
    prompt: str


@app.post("/")
async def root(item:PromptItem):
    images = stable_diffusion.generate_image(prompt=item.prompt, num_of_images=6)
    # binaryデータをbase64に変換してレスポンス
    return {"images": images}
