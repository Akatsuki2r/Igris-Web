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
    command: str
    
temp_memory = []


@app.post("/command")
async def command(rep: Reply):
    if len(temp_memory) > 20:
        temp_memory.pop(0)
    temp_memory.append(rep.command)
    print(temp_memory)
    return {"command": rep.command}


