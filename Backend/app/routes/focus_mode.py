from fastapi import APIRouter

router = APIRouter()

is_focus_on = False# This is a bit more practical as we are dealing with only one state change for both on and off.



@router.post('/focus/start')
async def start_focus():
    global is_focus_on
    if is_focus_on == False:
        is_focus_on = True
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
    if is_focus_on == True:
        is_focus_on = False
        print("focus off")
    else : 
        print("Error")
    return {"message": "Focus session stopped"}



