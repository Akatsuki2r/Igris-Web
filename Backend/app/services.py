import models



isFocus_on = False


isFocus_on = False

def focus_keyword(content: str) -> str:
    global isFocus_on

    text = content.casefold()

    if "start focus" in text:
        if not isFocus_on:
            isFocus_on = True
            return "Focus mode has been turned on Sir"
        else:
            return "Focus mode is already on Sir"

    return "Specify your request"
