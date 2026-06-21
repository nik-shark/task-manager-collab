==task create
board_id: int
status: У меня тут енам и он возвращает один и 3 вариантов, по умолчанию TODO
дедлайн передаётся из request, а остальное формируется системой
========request
{
"board_id": 1,
"status": "todo",
"description": "string",
"deadline_time": "2026-06-21T18:35:54.541Z"
}

========response
{
"status": "todo",
"deadline_time": "2026-06-21T18:35:54.541000+00:00",
"board_id": 1,
"description": "string",
"id": 6,
"created_at": "2026-06-21T18:36:10.466379+00:00",
"changed_at": "2026-06-21T18:36:10.466379+00:00"
}

==task_delete
('/{task_id}') - только id 

==task_get
только id как в get board

==task_update
status: У меня тут енам и он возвращает один и 3 вариантов, по умолчанию TODO
description: str
дедлайн передаётся из request, а остальное формируется системой



