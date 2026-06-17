from contextlib import asynccontextmanager

from fastapi import FastAPI

from config import engine, Base

from api.v1.health_check import router as health

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield


app = FastAPI(lifespan=lifespan)

app.include_router(health, prefix='/api/v1', tags=['check'])
