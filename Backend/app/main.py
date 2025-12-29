from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
import models 
import services

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


temp_memory = []


@app.post("/command")
async def command(rep: models.Reply):
    reply_text = services.focus_keyword(rep.reply)
    return {"reply": reply_text}
