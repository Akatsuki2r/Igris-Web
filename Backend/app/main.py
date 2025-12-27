from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class Reply(BaseModel):
    reply: str
    
temp_memory = []


@app.post("/command")
async def command(rep: Reply):
    if len(temp_memory) > 20:
        temp_memory.pop(0)

    temp_memory.append(rep.reply)

    thekeyword = rep.reply.casefold()

    if "start focus" in thekeyword:
        return {"reply": "Focus turning on"}
    else:
        return {"reply": "Specify your request"}
