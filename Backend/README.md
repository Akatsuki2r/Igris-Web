Igris-Web/
│
├── backend/
│   ├── app/
│   │   ├── main.py            # Entry point for FastAPI
│   │   ├── api/               # All routes (e.g., /generate-token)
│   │   │   └── livekit.py     # Token generator or calls
│   │   ├── core/              # Settings, config (e.g., LiveKit keys)
│   │   │   └── config.py
│   │   └── services/          # Logic layer (e.g., LiveKit SDK handling)
│   │       └── livekit_service.py
│   └── requirements.txt       # All needed packages
│
└── README.md (optional)

