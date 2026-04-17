### Hexlet tests and linter status:
[![Actions Status](https://github.com/UilKarter/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/UilKarter/frontend-project-12/actions)
[![Maintainability](https://qlty.sh/gh/UilKarter/projects/frontend-project-12/maintainability.svg)](https://qlty.sh/gh/UilKarter/projects/frontend-project-12)

**Hexlet Chat** — веб-приложение для общения в реальном времени, упрощённый аналог Slack с возможностью создавать каналы и обмениваться сообщениями.

---

## Возможности

-  Регистрация и аутентификация пользователей
-  Создание, переименование и удаление каналов
-  Обмен сообщениями в реальном времени (Socket.IO)
-  Фильтрация нецензурных слов
-  Всплывающие уведомления (toast)
-  Интернационализация (i18n) — русский язык
-  Адаптивный интерфейс на React Bootstrap

---

## Технологии

- **Фронтенд:** React, Redux Toolkit, React Router, Formik, Yup, React Bootstrap, Socket.IO-client
- **Бэкенд:** @hexlet/chat-server (готовый сервер), WebSocket
- **Сборка и деплой:** Vite, Render, Rollbar (мониторинг ошибок)

---

## Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/UilKarter/frontend-project-12.git
cd frontend-project-12

# Установка зависимостей
make install

# Сборка фронтенда для продакшена
make build

# Запуск сервера (бэкенд + статика)
make start
```
---

## Демо

https://frontend-project-12-1v7h.onrender.com
