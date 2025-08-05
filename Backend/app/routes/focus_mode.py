from fastapi import APIRouter

router = APIRouter()

on_focus = False
off_focus = True



@router.post('/focus/start')
async def start_focus():
    global on_focus
    if on_focus == False:
        on_focus = True
        print("Timer has been started")
    else : 
        print("Error")
    return {'message': 'Focus mode started'}

#@router.get means get something or print maybe even show something then @router.post is like creating a new task or starting something new it can also be interpreted as making something new.

"""POST means: "I want to create something" (like start a focus session).

GET means: "I want to fetch something" (like check focus session status).

DELETE means: "I want to remove something."

PUT / PATCH means: "I want to update something."""

@router.post('/focus/stop')
async def stop_focus():
    global off_focus
    if off_focus == True:
        off_focus = False
        print("focus off")
    else : 
        print("Error")
    return {"message": "Focus session stopped"}



