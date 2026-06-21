from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from schemas.tasks import CreateTaskRequest
from config import get_db
from service.task import create_task

router = APIRouter()


@router.post('/')
async def task_create(
        task_data: CreateTaskRequest,
        db: AsyncSession = Depends(get_db)
):
    new_task = await create_task(task_data, db)

    return new_task

