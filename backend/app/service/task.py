from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from db.models.tasks import Tasks
from schemas.tasks import CreateTaskRequest, UpdateTaskRequest


async def create_task(task_data: CreateTaskRequest, db: AsyncSession) -> Tasks:

    new_task = Tasks(
        board_id=task_data.board_id,
        status=task_data.status,
        description=task_data.description,
        deadline_time=task_data.deadline_time
    )


    db.add(new_task)

    await db.commit()
    await db.refresh(new_task)

    return new_task


async def delete_task(task_id: int, db: AsyncSession):

    result = await db.execute(
        select(Tasks).where(
            Tasks.id == task_id
        )
    )

    task_delete_item = result.scalar_one_or_none()

    if task_delete_item is None:
        raise HTTPException(
            status_code=404,
            detail=f"{task_id} not found"
        )

    await db.delete(task_delete_item)
    await db.commit()

    return {
        "status": "success",
        "task_id": task_id
    }


async def update_task(task_id: int, task_data: UpdateTaskRequest, db: AsyncSession):

    task_update_item = await db.scalar(
        select(Tasks).where(
            Tasks.id == task_id
        )
    )

    if task_update_item is None:
        raise HTTPException(
            status_code=404,
            detail=f"Task {task_id} not found"
        )

    task_update_item.status = task_data.status
    task_update_item.description = task_data.description
    task_update_item.deadline_time = task_data.deadline_time

    await db.commit()
    await db.refresh(task_update_item)

    return task_update_item