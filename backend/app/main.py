from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import db.models
from config import engine, Base

from api.v1.boards.board_create import router as board_create
from api.v1.boards.board_get import router as board_get
from api.v1.boards.board_delete import router as board_delete
from api.v1.boards.board_update import router as board_update

from api.v1.tasks.task_create import router as task_create
from api.v1.tasks.task_get import router as task_get
from api.v1.tasks.task_delete import router as task_delete
from api.v1.tasks.task_update import router as task_update


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield


app = FastAPI(lifespan=lifespan)

# CORS HEADERS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# \===== boards api =====/ #
app.include_router(board_get, prefix='/api/v1/boards', tags=['boards'])
app.include_router(board_create, prefix='/api/v1/boards', tags=['boards'])
app.include_router(board_delete, prefix='/api/v1/boards', tags=['boards'])
app.include_router(board_update, prefix='/api/v1/boards', tags=['boards'])


# \===== tasks api =====/ #
app.include_router(task_create, prefix='/api/v1/tasks', tags=['tasks'])
app.include_router(task_get, prefix='/api/v1/tasks', tags=['tasks'])
app.include_router(task_delete, prefix='/api/v1/tasks', tags=['tasks'])
app.include_router(task_update, prefix='/api/v1/tasks', tags=['tasks'])