interface Category {
    id: string;
    title: string;
    name: string;
    image: string;
}

interface Drink {
    id: string;
    name: string;
    image: string;
    price: number;
    badge?: string;
    description: string;
}

export const categories: Category[] = [
    { id: 'coffee', title: 'Кофе', name: 'Кофе', image: '/coffeeCategory.png' },
    { id: 'tea', title: 'Чай', name: 'Чай', image: '/teaCategory.png' },
    { id: 'milkshake', title: 'Милкшейк', name: 'Милкшейк', image: '/milkshakeCategory.png' },
    { id: 'sprajt', title: 'Спрайт', name: 'Спрайт', image: '/sprajtCategory.png' }
];

export const drinks: Drink[] = [
    { id: '4', name: 'Эспрессо', image: '/espresso.png', price: 80, description: 'Классический эспрессо' },
    { id: '5', name: 'Двойной эспрессо', image: '/espresso.png', price: 120, badge: '2x', description: 'Двойная порция эспрессо' },
    { id: '3', name: 'Американо', image: '/americano.png', price: 100, description: 'Эспрессо с горячей водой' },
    { id: '1', name: 'Латте', image: '/latte.png', price: 120, description: 'Эспрессо с молоком' },
    { id: '2', name: 'Капучино', image: '/cappucino.png', price: 130, description: 'Эспрессо с молочной пенкой' },
    { id: '6', name: 'Макиато', image: '/macchiato.png', price: 90, description: 'Эспрессо с каплей молока' }
]; 