from sqlalchemy import String, ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from config import Base


class UsersBoards(Base):
    __tablename__ = 'users_boards'

    # TODO id = UUID, user_id = UUID
    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
        server_default= text("'Новая заметка'")
    )


    user: Mapped['Users'] = relationship(back_populates='user_boards')

    tasks: Mapped[list['Tasks']] = relationship(
        back_populates='board',
        cascade='all, delete-orphan'
    )