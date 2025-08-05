igris_backend/
├── app/
│   ├── __init__.py
│   ├── main.py                # Starts the FastAPI app
│   ├── routes/                # All feature-specific routers
│   │   ├── __init__.py
│   │   ├── focus_mode.py      # Focus mode routes live here
│   │   ├── battle_log.py      # (future) Battle log routes
│   │   └── igris.py           # (future) Igris-related endpoints
│   ├── models/                # Data models & schemas
│   │   ├── __init__.py
│   │   └── focus_mode.py      # Schema for focus mode
│   ├── database/              # (future) Database logic
│   │   ├── __init__.py
│   │   └── db.py              # Connect to a database (SQLite/PostgreSQL)
│   ├── services/              # (future) Business logic or helpers
│   │   ├── __init__.py
│   │   └── focus.py           # Custom logic for calculating durations
├── requirements.txt           # All Python packages
└── README.md                  # Project description/instructions
