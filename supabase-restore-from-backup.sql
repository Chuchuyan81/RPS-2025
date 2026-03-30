-- Восстановление данных приложения RPS из резервной копии db_cluster-10-08-2025@22-38-03.backup.gz
--
-- Полный дамп кластера PostgreSQL нельзя накатить на Supabase целиком (роли auth/realtime/storage уже есть).
-- Этот скрипт: схема public.games как в supabase-setup.sql + строки games, извлечённые из бэкапа
-- (скрипт tools/extract_games_inserts.py). Битые значения player*_choice в дампе заменены на NULL.
--
-- Запуск: Supabase Dashboard → SQL Editor → вставить и выполнить один раз для проекта cchbitomcbuczxwxjobw
-- (или любого другого, после подстановки URL/ключей в script.js).

-- Удаляем старую таблицу если существует (осторожно в продакшене!)
DROP TABLE IF EXISTS games;

CREATE TABLE games (
    id BIGSERIAL PRIMARY KEY,
    room_id TEXT NOT NULL UNIQUE,
    player1_id TEXT,
    player2_id TEXT,
    player1_choice TEXT CHECK (player1_choice IN ('камень', 'ножницы', 'бумага')),
    player2_choice TEXT CHECK (player2_choice IN ('камень', 'ножницы', 'бумага')),
    status TEXT NOT NULL DEFAULT 'waiting_player2' CHECK (status IN ('waiting_player2', 'ready', 'playing', 'finished')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_games_room_id ON games(room_id);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_games_created_at ON games(created_at);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on games" ON games
  FOR ALL USING (true) WITH CHECK (true);

-- Добавление в публикацию Realtime; игнор, если таблица уже в публикации
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE games;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_games_updated_at
    BEFORE UPDATE ON games
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION cleanup_old_games()
RETURNS void AS $$
BEGIN
    DELETE FROM games
    WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE games IS 'Таблица для хранения игровых сессий "Камень, Ножницы, Бумага"';
COMMENT ON COLUMN games.room_id IS 'Уникальный идентификатор комнаты';
COMMENT ON COLUMN games.player1_id IS 'ID первого игрока (создателя комнаты)';
COMMENT ON COLUMN games.player2_id IS 'ID второго игрока (присоединившегося)';
COMMENT ON COLUMN games.player1_choice IS 'Выбор первого игрока';
COMMENT ON COLUMN games.player2_choice IS 'Выбор второго игрока';
COMMENT ON COLUMN games.status IS 'Статус игры: waiting_player2, ready, playing, finished';
COMMENT ON COLUMN games.created_at IS 'Время создания записи';
COMMENT ON COLUMN games.updated_at IS 'Время последнего обновления записи';

-- Данные из резервной копии (9 строк, включая комнату бота 9999)
INSERT INTO public.games (id, room_id, player1_id, player2_id, player1_choice, player2_choice, status, created_at, updated_at) VALUES
(39, '5458', 'player_ca6d6o5zi_1752858187911', 'player_0ejqx3pwz_1752858203360', NULL, 'ножницы', 'playing', '2025-07-18 17:03:08.466+00'::timestamptz, '2025-07-18 17:04:33.918138+00'::timestamptz),
(36, '6852', 'player_u6f42c990_1752856056294', 'player_zn5gac4xw_1752856140848', NULL, NULL, 'ready', '2025-07-18 16:27:36.572+00'::timestamptz, '2025-07-18 16:30:12.473627+00'::timestamptz),
(29, '8312', 'player_qmfvr44i6_md36ned3', 'player_8kshtnzje_md36nlaj', 'камень', 'камень', 'playing', '2025-07-14 14:12:28.595+00'::timestamptz, '2025-07-14 14:17:03.857543+00'::timestamptz),
(27, '3251', 'player_jjuey3xti_md35ygiz', 'player_znk26ya45_md376gl8', NULL, NULL, 'ready', '2025-07-14 13:53:05.131+00'::timestamptz, '2025-07-14 14:27:19.652571+00'::timestamptz),
(37, '5286', 'player_s6q33c32n_1752858006659', 'player_dw3kwneqz_1752858025174', NULL, 'ножницы', 'playing', '2025-07-18 17:00:07.796+00'::timestamptz, '2025-07-18 17:00:29.245971+00'::timestamptz),
(31, '8420', 'player_unssnlnrq_1752595175916', NULL, NULL, NULL, 'waiting_player2', '2025-07-15 15:59:36.698+00'::timestamptz, '2025-07-15 15:59:36.698+00'::timestamptz),
(32, '7341', 'player_r1iwdqqcr_1752676086060', 'player_t01zm7hd8_1752676156908', NULL, NULL, 'ready', '2025-07-16 14:28:06.61+00'::timestamptz, '2025-07-16 14:29:18.033584+00'::timestamptz),
(35, '7227', 'player_7tds4ubld_1752855970285', NULL, NULL, NULL, 'waiting_player2', '2025-07-18 16:26:12.522+00'::timestamptz, '2025-07-18 16:26:12.522+00'::timestamptz),
(30, '9999', 'bot_player_9999', NULL, NULL, NULL, 'waiting_player2', '2025-07-15 15:37:18.599+00'::timestamptz, '2025-08-02 06:04:09.366361+00'::timestamptz);

SELECT setval(pg_get_serial_sequence('public.games', 'id'), COALESCE((SELECT MAX(id) FROM public.games), 1));
