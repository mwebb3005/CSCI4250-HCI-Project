import random

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from googletrans import Translator
from prompts import sentences

app = FastAPI()
translator = Translator()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    text: str


@app.get("/prompts")
async def prompts():
    random.shuffle(sentences)
    return sentences


@app.post("/translate")
async def translate_and_grade(input: Item):
    try:
        processed_text = input.text
        result = translator.translate(processed_text, dest='en')
        return {"original_text": input.text, "processed_text": result.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
