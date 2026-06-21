from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.boards import CreateBoardRequest
from config import get_db
from service.boards import create_board


router = APIRouter()

@router.post('/')
async def board_create(
        board_data: CreateBoardRequest,
        db: AsyncSession = Depends(get_db)
):
    board = await create_board(board_data, db)

    return board

