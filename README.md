
# Self-Service Coffee Shop

Интерактивное приложение для имитации киоска самообслуживания по продаже кофе. Разработано с использованием **React**, **TypeScript**, **Vite** и адаптировано под работу в браузере с эмуляцией оборудования.

## Технологии

- React + TypeScript
- Vite
- SCSS-модули
- Эмуляция оборудования (купюроприемник, банковский терминал, выдача товара)
- Адаптивная верстка

## Демонстрация

Вы можете посмотреть, как работает проект, по ссылке:  
👉 [Открыть демо на Vercel](https://self-service-coffee-shop-js1a.vercel.app/)
👉 [Открыть макет в Figma](https://www.figma.com/design/16HWJTBtUov3PkRYNR86M3/Coffee-Shop?node-id=0-1&p=f&t=3i3s6crZ24JQAQ9b-0)

## Запуск проекта

1. Установите зависимости:

```bash
npm install
```

2. Запустите проект:

```bash
npm run dev
```

3. Откройте в браузере:

```
http://localhost:5173
```

## Структура проекта

```
├── assets/              # Шрифты, изображения
src/           
├── components/          # UI-компоненты
├── emulator/            # Эмулятор оборудования
├── types/               # Типы TypeScript
└── App.tsx              # Точка входа
```

## Эмуляция оборудования

Интерфейс взаимодействует с объектом `emulator`, который имитирует работу внешних устройств:

- `StartCashin(cb: (amount: number) => void)`
  - Нажмите **Ctrl + 1 / 2 / 5 / 0** — эмуляция внесения 10/50/100/500 ₽.
- `BankCardPurchase(amount, cb, displayCb)`
  - Ctrl + Enter — подтвердить оплату, Ctrl + Escape — отменить.
- `Vend(product_idx, cb)`
  - Ctrl + Enter — успех, Ctrl + Backspace — отмена.
- `BankCardCancel(cb)`
  - Прерывает текущую оплату картой.

## 🖋 Шрифты

Шрифты `Mont` подключены из директории `/public/fonts`. Убедитесь, что они корректно зарегистрированы в `fonts.css`.

Пример подключения:

```css
@font-face {
  font-family: 'Mont';
  src: url('/fonts/Mont-ExtraLightDEMO.otf') format('opentype');
  font-weight: 300;
}
```

## Тестовые клавиши

| Действие                  | Комбинация клавиш       |
|---------------------------|--------------------------|
| Внести 10/50/100/500 ₽    | Ctrl + 1 / 2 / 5 / 0     |
| Подтвердить оплату картой | Ctrl + Enter             |
| Отменить оплату картой    | Ctrl + Escape            |
| Подтвердить выдачу товара | Ctrl + Enter             |
| Отменить выдачу товара    | Ctrl + Backspace         |


