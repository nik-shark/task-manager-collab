from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from config import get_db
from schemas.boards import UpdateBoardRequest
from service.boards import update_board


router = APIRouter()


@router.put('/{board_id}')
async def board_update(
        board_id: int,
        board_data: UpdateBoardRequest,
        db: AsyncSession = Depends(get_db)
):

    return await update_board(
        board_id=board_id,
        board_data=board_data,
        db=db
    )