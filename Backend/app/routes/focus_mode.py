from fastapi import APIRouter

router = APIRouter()

@router.post('/focus/start')
async def start_focus():
    return {'message': 'Focus mode started'}

#@router.get means get something or print maybe even show something then @router.post is like creating a new task or starting something new it can also be interpreted as making something new.

