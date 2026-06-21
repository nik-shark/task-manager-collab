from fastapi import APIRouter, Depends

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import get_db
from db.models.tasks import Tasks

router = APIRouter()


@router.get('/')
async def task_get_all(
        task_id: int,
        db: AsyncSession = Depends(get_db)
):

    result = await db.execute(
        select(Tasks).where(
            Tasks.id == task_id
        )
    )

    return result.scalars().all()

