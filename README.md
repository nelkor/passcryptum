# Passcryptum 🔑

Менеджер паролей нового типа. Пароли не хранятся ни в каком виде,
а вычисляются по требованию из значений:

- мастер-пароль
- имя сервиса
- логин
- версия
- алгоритм

## 🗊 Описание значений для генерации

### Мастер-пароль

Надёжный и секретный пароль, который знает пользователь.
Пример мастер-пароля: `Ix6kNeHppAh1NaY`.

### Имя сервиса

Пользователь заводит в систему сервисы, в которых он зарегистрирован.
Имя каждого сервиса участвует в генерации пароля.
Пример имени сервиса: `google.com`.

### Логин

Псевдоним пользователя, которым он авторизуется в сервисе. Для одного сервиса
может быть заведено любое количество логинов. Пример логина: `nelkor@gmail.com`.

### Версия

Иногда требуется поменять пароль для логина в сервисе. Например, если пароль
был скомпрометирован. С этой целью существует переменная величина — версия.
Версия представляет собой натуральное число. При создании нового логина
ему выдаётся версия "1".

### Алгоритм

Разные сервисы по разному относятся к паролям своих пользователей. Например,
где-то могут быть запрещены спецсимволы в пароле. С этой целью пользователь
нашей системы может выбрать опциональный алгоритм генерации
(например, "без спецсимволов"). Кроме того, пользователь может выбрать
предпочитаемую длину пароля (от 8 до 32 символов).
По умолчанию используется алгоритм "самый надёжный", длина 20 символов.

## 🧑‍💻 Используемые технологии

Приложение представляет собой исключительно Frontend.
При разработке используем Vue 3, TypeScript, SCSS.

## 🧠 Архитектура

Для организации кода используем методологию [Feature-Sliced Design](https://feature-sliced.design/ru).

<details>
 <summary>📚 Справочник Feature-Sliced Design</summary>
  
  Концепции

- Public API

  Каждый модуль должен иметь на верхнем уровне декларацию своего публичного API

- Изоляция

  Модуль не должен зависеть напрямую от других модулей того же слоя или вышележащих слоев

- Понимание потребностей

  Ориентирование на потребности бизнеса и пользователя

- Явная бизнес-логика

  Архитектуру легко осваивать, поскольку она состоит из доменных модулей

- Адаптивность

  Компоненты архитектуры можно гибко заменять, добавлять под новые условия

- Технический долг

  Каждый модуль можно независимо модифицировать / переписать без сайд-эффектов

- Явная переиспользуемость

  Сохраняется баланс между DRY и локальной кастомизацией

![Схема](https://feature-sliced.design/ru/assets/ideal-img/visual_schema.d700567.1030.jpg)

- Слой

<strong>Представители</strong>: app, processes, pages, widgets, features, entities, shared

  <pre>
    <code>
  └── src/
      ├── app/                    # Инициализирующая логика приложения
      ├── processes/              # (Опц.) Процессы приложения, протекающие над страницами
      ├── pages/                  # Страницы приложения
      ├── widgets/                # Самостоятельные и полноценные блоки для страниц
      ├── features/               # (Опц.) Обрабатываемые пользовательские сценарии
      ├── entities/               # (Опц.) Бизнес-сущности, которыми оперирует предметная область
      └── shared/                 # Переиспользуемые модули, без привязки к бизнес-логике
    </code>
  </pre>

- Слайс

<strong>Представители</strong> (от каждого слоя) process, page, widget, feature, entity

  <pre>
    <code>
  ├── app/
      |   # Не имеет конкретных слайсов, 
      |   # Т.к. там содержится мета-логика над проектом и его инициализации
      ├── processes/
      |   # Слайсы для реализации процессов на страницах
      |   ├── payment
      |   ├── auth
      |   ├── quick-tour
      |   └── ...
      ├── pages/
      |   # Слайсы для реализации страниц приложения
      |   # При этом, в силу специфики роутинга - могут вкладываться друг в друга
      |   ├── profile
      |   ├── sign-up
      |   ├── feed
      |   └── ...
      ├── widgets/
      |   # Слайсы для реализации самостоятельных блоков страниц
      |   ├── header
      |   ├── feed
      |   └── ...
      ├── features/
      |   # Слайсы для реализации пользовательских сценариев на страницах
      |   ├── auth-by-phone
      |   ├── inline-post
      |   └── ...
      ├── entities/
      |   # Слайсы бизнес-сущностей для реализации более сложной БЛ
      |   ├── viewer
      |   ├── posts
      |   ├── i18n
      |   └── ...
      ├── shared/
      |    # Не имеет конкретных слайсов
      |    # Представляет собой скорее набор общеиспользуемых сегментов, без привязки к БЛ
    </code>
  </pre>

- Сегмент

<strong>Представители:</strong> ui, model, lib, api, config

  <pre>
    <code>
  {layer}/
      ├── {slice}/
      |   ├── ui/                     # UI-логика (components, ui-widgets, ...)
      |   ├── model/                  # Бизнес-логика (store, actions, effects, reducers, ...)
      |   ├── lib/                    # Инфраструктурная логика (utils/helpers)
      |   ├── config/                 # Конфигурация приложения (env-vars, ...)
      |   └── api/                    # Логика запросов к API (api instances, requests, ...)
    </code>
  </pre>
</details>

<br>

При разработке вёрстки мы придерживаемся методологии [BEM</span>](https://ru.bem.info/methodology).

<details>
  <summary>📚 Справочник BEM</summary>
  
  ![BEM](https://res.cloudinary.com/practicaldev/image/fetch/s--OkBgfgPx--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/yc0hv58in4eyxjj7qlcg.png)
  
- Блок

    Название блока характеризует смысл («что это?» — «меню»: menu, «кнопка»: button), а не состояние («какой, как выглядит?» — «красный»: red, «большой»: big).

#### Пример

```html
<!-- Блок `header` -->
<header class="header">
  <!-- Вложенный блок `logo` -->
  <div class="logo"></div>

  <!-- Вложенный блок `search-form` -->
  <form class="search-form"></form>
</header>
```

- Элемент

  Составная часть блока, которая не может использоваться в отрыве от него.

  Название элемента характеризует смысл («что это?» — «пункт»: item, «текст»: text), а не состояние («какой, как выглядит?» — «красный»: red, «большой»: big).

  Структура полного имени элемента соответствует схеме: `имя-блока__имя-элемента`. Имя элемента отделяется от имени блока двумя подчеркиваниями (`__`).

#### Пример

```html
<!-- Блок `search-form` -->
<form class="search-form">
  <!-- Элемент `input` блока `search-form` -->
  <input class="search-form__input" />

  <!-- Элемент `button` блока `search-form` -->
  <button class="search-form__button">Найти</button>
</form>
```

- Модификатор

  Стиль Two Dashes
  Сущность, определяющая внешний вид, состояние или поведение блока либо элемента.

  Название модификатора характеризует внешний вид («какой размер?», «какая тема?» и т. п. — «размер»: block--size-s, «тема»: block--theme-islands), состояние («чем отличается от прочих?» — «отключен»: disabled, «фокусированный»: focused) и поведение («как ведет себя?», «как взаимодействует с пользователем?» — «направление»: directions--left-top).

  Значение модификатора отделяется от его имени двумя дефисами (--).

#### Пример

```html
<!-- Блок `search-form` имеет булевый модификатор `focused` -->
<form class="search-form search-form--focused">
  <input class="search-form__input" />

  <!-- Элемент `button` имеет булевый модификатор `disabled` -->
  <button class="search-form__button search-form__button--disabled">
    Найти
  </button>
</form>
```

</details>
