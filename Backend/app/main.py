from fastapi import FastAPI
from app.routes import focus_mode


app = FastAPI()
app.include_router(focus_mode.router, prefix="/focus")



@app.get('/')
async def hello():
    return 'Sup'
