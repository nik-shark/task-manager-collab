## БД models (psql)

    users
        id, user_name(32), email(64), pass(16) <- ограничения длинны
        ответы статус, success(bool), message(инфа)
    
    связанная таблица user_boards
        id, userid, title(128)
        
    связанная таблица task
        id, board_id, жестко типизированный status(to do, in progress, done),
        descr(512), created_at, changed_at, deadline

## бд redis кеш сайта (у кого пока хз) и для логов(у меня)

добавить jwt (ac 30min, ref 24h) -> на потом
пароли солим и хешим через argon2

## endpoints

    /login
    /boards
    /




сделать endpoint для boards