# -*- coding: utf-8 -*-
"""Извлечь строки games из gzip-дампа кластера в INSERT для Supabase."""
import gzip
import sys
from pathlib import Path

ALLOWED = {"\u043a\u0430\u043c\u0435\u043d\u044c", "\u043d\u043e\u0436\u043d\u0438\u0446\u044b", "\u0431\u0443\u043c\u0430\u0433\u0430"}


def norm_choice(s):
    if s is None or s == r"\N" or s == "":
        return None
    s = s.strip()
    if s in ALLOWED:
        return s
    return None


def sql_val(x):
    if x is None:
        return "NULL"
    return "'" + str(x).replace("'", "''") + "'"


def sql_txt(x):
    if x == r"\N" or x is None:
        return "NULL"
    return "'" + str(x).replace("'", "''") + "'"


def main():
    root = Path(__file__).resolve().parent.parent
    gz = root / "db_cluster-10-08-2025@22-38-03.backup.gz"
    if not gz.exists():
        print("Нет файла:", gz, file=sys.stderr)
        sys.exit(1)

    with gzip.open(gz, "rt", encoding="utf-8", errors="replace") as f:
        text = f.read()

    n = text.find("COPY public.games (")
    if n == -1:
        print("COPY public.games не найден", file=sys.stderr)
        sys.exit(1)

    sub = text[n:]
    line_end = sub.find("\n")
    rest = sub[line_end + 1 :]
    for marker in ("\n\\.\n", "\n\\.\r\n"):
        ei = rest.find(marker)
        if ei != -1:
            body = rest[:ei]
            break
    else:
        print("Конец COPY не найден", file=sys.stderr)
        sys.exit(1)

    rows = []
    for line in body.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        if len(parts) != 9:
            print("Пропуск строки (не 9 колонок):", line[:100], file=sys.stderr)
            continue
        id_, room_id, p1, p2, c1, c2, status, ca, ua = parts
        c1 = norm_choice(c1)
        c2 = norm_choice(c2)
        rows.append(
            f"({sql_txt(id_)}, {sql_txt(room_id)}, {sql_txt(p1)}, {sql_txt(p2)}, "
            f"{sql_val(c1)}, {sql_val(c2)}, {sql_txt(status)}, {sql_txt(ca)}::timestamptz, {sql_txt(ua)}::timestamptz)"
        )

    out = root / "_insert_games_fragment.sql"
    content = (
        "INSERT INTO public.games (id, room_id, player1_id, player2_id, player1_choice, player2_choice, status, created_at, updated_at) VALUES\n"
        + ",\n".join(rows)
        + ";\n\n"
        "SELECT setval(pg_get_serial_sequence('public.games', 'id'), COALESCE((SELECT MAX(id) FROM public.games), 1));\n"
    )
    out.write_text(content, encoding="utf-8")
    print("OK, строк:", len(rows), "->", out)


if __name__ == "__main__":
    main()
