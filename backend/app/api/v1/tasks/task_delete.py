from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from config import get_db
from service.task import delete_task


router = APIRouter()


@router.delete('/{task_id}')
async def task_delete(
        task_id: int,
        db: AsyncSession = Depends(get_db)
):

    return await delete_task(
        task_id=task_id,
        db=db
    )