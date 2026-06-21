from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from db.models.user_boards import UsersBoards
from schemas.boards import CreateBoardRequest, UpdateBoardRequest

TEMP_USER_ID = 1


async def create_board(board_data: CreateBoardRequest, db: AsyncSession) -> UsersBoards:

    new_board = UsersBoards(
        user_id=board_data.user_id,
        title=board_data.title
    )

    db.add(new_board)

    await db.commit()
    await db.refresh(new_board)

    return new_board


async def delete_board(board_id: int, db: AsyncSession):

    result = await db.execute(
        select(UsersBoards).where(
            UsersBoards.user_id == TEMP_USER_ID,
            UsersBoards.id == board_id
        )
    )

    board_delete_item = result.scalar_one_or_none()

    if board_delete_item is None:
        raise HTTPException(
            status_code=404,
            detail=f"{board_id} not found"
        )

    await db.delete(board_delete_item)
    await db.commit()

    return {
        "status": "success",
        "board_id": board_id
    }


async def update_board(board_id: int, board_data: UpdateBoardRequest, db: AsyncSession):

    result = await db.execute(
        select(UsersBoards).where(
            UsersBoards.user_id == TEMP_USER_ID,
            UsersBoards.id == board_id
        )
    )

    board_update_item = result.scalar_one_or_none()

    if board_update_item is None:
        raise HTTPException(
            status_code=404,
            detail=f"Board {board_id} not found"
        )

    board_update_item.title = board_data.title

    await db.commit()
    await db.refresh(board_update_item)

    return board_update_item