import datetime

from sqlalchemy import Text, DateTime, func, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from config import Base

from enums import TaskStatus


class Tasks(Base):
    __tablename__ = 'tasks'

    id: Mapped[int] = mapped_column(primary_key=True)

    board_id: Mapped[int] = mapped_column(
        ForeignKey('users_boards.id', ondelete='CASCADE'),
        nullable=False
    )

    status: Mapped[TaskStatus] = mapped_column(
        SQLEnum(TaskStatus),
        nullable=False,
        default=TaskStatus.TODO
    )

    description: Mapped[str] = mapped_column(Text, nullable=False)

    deadline_time: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    changed_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )


    board: Mapped['UsersBoards'] = relationship(back_populates='tasks')
