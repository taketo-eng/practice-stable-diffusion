import io
import os

from diffusers import StableDiffusionPipeline
from dotenv import load_dotenv
import torch
from torch import autocast


load_dotenv()
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

def generate_image(prompt='best quality, background illustration, Uyuni salt lake', num_of_images=1):
    ldm = StableDiffusionPipeline.from_pretrained(
        'CompVis/stable-diffusion-v1-4',
        revision='fp16',
        torch_dtype=torch.float16,
        use_auth_token=ACCESS_TOKEN
    ).to('cuda')

    binary_images = []
    for _ in range(num_of_images):
        with autocast('cuda'):
            image = ldm(prompt).images[0]
        img_bytes = io.BytesIO()
        image.save(img_bytes, format='png')
        binary_images.append(img_bytes.getvalue())
    return binary_images