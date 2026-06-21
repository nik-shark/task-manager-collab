from pydantic import BaseModel, Field
from datetime import datetime

from enums import TaskStatus


class CreateTaskRequest(BaseModel):
    board_id: int
    status: TaskStatus = TaskStatus.TODO
    description: str = Field(..., min_length=1)
    deadline_time: datetime | None = None


class UpdateTaskRequest(BaseModel):
    status: TaskStatus
    description: str
    deadline_time: datetime | None = None
