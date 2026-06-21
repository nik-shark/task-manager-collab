from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from config import get_db
from service.boards import delete_board

TEMP_USER_ID = 1

router = APIRouter()


@router.delete('/{board_id}')
async def board_delete(
        board_id: int,
        db: AsyncSession = Depends(get_db)
):
    return await delete_board(
        board_id=board_id,
        db=db
    )