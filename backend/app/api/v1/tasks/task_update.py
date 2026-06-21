from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import get_db

from db.models.tasks import Tasks
from schemas.tasks import UpdateTaskRequest
from service.task import update_task


router = APIRouter()


@router.put('/{task_id}')
async def task_update(
        task_id: int,
        task_data: UpdateTaskRequest,
        db: AsyncSession = Depends(get_db)
):
    return await update_task(
        task_id=task_id,
        task_data=task_data,
        db=db
    )