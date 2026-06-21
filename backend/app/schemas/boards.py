from pydantic import BaseModel, Field


class CreateBoardRequest(BaseModel):
    user_id: int
    title: str = Field(default="Новая заметка", max_length=64)


class UpdateBoardRequest(BaseModel):
    title: str = Field(default="Новая заметка", max_length=64)