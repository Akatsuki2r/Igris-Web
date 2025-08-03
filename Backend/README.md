igris-backend/
├── app/
│   ├── main.py           ← FastAPI entrypoint
│   ├── core/
│   │   └── config.py     ← settings, environment
│   ├── api/
│   │   └── routes.py     ← your single POST endpoint for now
│   ├── services/
│   │   └── brain.py      ← prompt + response logic
│   └── memory/
│       └── memory.json   ← local JSON memory storage (we’ll build this out)
├── requirements.txt      ← Python dependencies
└── README.md             ← Optional docs
