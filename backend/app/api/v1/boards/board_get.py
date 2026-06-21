from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import get_db
from db.models.user_boards import UsersBoards
from db.models.users import Users


router = APIRouter()


@router.get('/')
async def board_get_all(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(UsersBoards).where(
            UsersBoards.user_id == user_id
        )
    )


    return result.scalars().all()


