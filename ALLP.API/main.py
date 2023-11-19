from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from googletrans import Translator

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


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/translate")
async def translate_and_grade(input: Item):
    try:
        processed_text = input.text[::-1]
        # detected = translator.detect('مساء الخير، أهلا بكم في اجتماعنا الليلة.')
        test = translator.translate(processed_text, dest='en')
        return {"original_text": input.text, "processed_text": test.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
