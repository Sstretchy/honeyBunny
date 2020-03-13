import { action, configure, observable } from 'mobx';
import { requestService } from '../request.service';
import ToastService from '../toast.notify';

configure({ enforceActions: 'observed' });

class BasketStore {

    @observable
    status = false;

    @observable
    summa = 0;

    @observable
    categories = [];

    @observable
    good = [];

    @observable
    stuff = [];

    @observable
    basket = localStorage.getItem('id') ? [] : JSON.parse(localStorage.getItem('basket')) || [];

    @observable
    count = localStorage.getItem('id') ? 0 : JSON.parse(localStorage.getItem('count'));

    @observable
    user_id = parseInt(localStorage.getItem('id'), 10);

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    setSumma = () => {
        this.summa = 0;
        this.basket.forEach(item => this.summa += item.amount * item.good.price);
    }

    @action
    removeFromBasket = async (itemId, index) => {
        if (localStorage.getItem('jwt')) {
            try {
                await requestService.basket.deleteFromBasket(itemId);
                const basket = await requestService.basket.getBasket(this.user_id);
                this.setToStore('basket', basket)
            } catch (signInError) {
                console.log('Ошибка удаления');
            }
        } else {
            this.basket.splice(index, 1);
            this.count = this.basket.length;
            this.setSumma()
            localStorage.setItem('basket', JSON.stringify(this.basket));
            localStorage.setItem('count', JSON.stringify(this.count));
        }
    }

    @action
    addProduct = async (item_id, amount, index) => {
        if (localStorage.getItem('jwt')) {
            try {
                await requestService.basket.putBasket(item_id, { amount });
                const basket = await requestService.basket.getBasket(this.user_id);
                this.setToStore('basket', basket)
            } catch (signInError) {
                console.log('Ошибка при получении корзины');
            }
        } else {
            this.basket[index].amount = amount;
            this.setSumma()
            localStorage.setItem('basket', JSON.stringify(this.basket));
        }
    }

    @action
    addToBasket = async (good_id) => {
        if (localStorage.getItem('jwt')) {
            this.user_id = parseInt(localStorage.getItem('id'), 10);
            try {
                await requestService.basket.postBasket({ amount: 1, user_id: this.user_id, good_id });
                const basket = await requestService.basket.getBasket(this.user_id);
                this.setToStore('basket', basket)
            } catch (signInError) {
                ToastService.notify('Уже в Вашей корзине');
            }
        } else {
            const good = await requestService.good.getGood(good_id);
            this.addToLocalBasket(good)
        }
    }

    @action
    addToLocalBasket = (good) => {
        if (!this.basket.find((element) => element.good.id === good.id)) {
            this.basket.push(
                {
                    good: {
                        id: good.id,
                        name: good.name,
                        weight: good.weight,
                        description: good.description,
                        measure: good.measure,
                        price: good.price,
                        link: good.link,
                        category: good.category
                    },
                    amount: 1
                }
            );
            this.count = this.basket.length;
            this.setSumma()
            localStorage.setItem('basket', JSON.stringify(this.basket));
            localStorage.setItem('count', JSON.stringify(this.count));
        } else {
            ToastService.notify('Уже в Вашей корзине');
        }
    }

    @action
    reduceProduct = async (item_id, amount, index) => {
        if (amount) {
            if (localStorage.getItem('jwt')) {
                try {
                    await requestService.basket.putBasket(item_id, { amount });
                    const basket = await requestService.basket.getBasket(this.user_id);
                    this.setToStore('basket', basket)
                } catch (signInError) {
                    console.log('Ошибка при получении корзины');
                }
            } else {
                this.basket[index].amount = amount;
                this.setSumma()
                localStorage.setItem('basket', JSON.stringify(this.basket));
            }
        } else {
            if (localStorage.getItem('jwt')) {
                await this.removeFromBasket(item_id)
            } else {
                this.removeFromBasket(item_id, index)
            }
        }
    }


    fetchStuff = async (category) => {
        try {
            const stuff = await requestService.good.getGoodByCategory(category);
            this.setToStore('stuff', stuff)
        } catch (signInError) {
            console.log('Категории нет в базе, ага');
        }
    }

    fetchBasket = async () => {
        try {
            const basket = await requestService.basket.getBasket(this.user_id);
            this.setToStore('basket', basket)
        } catch (signInError) {
            console.log('Ошибка при получении корзины');
        }
    }

    fetchCategories = async () => {
        try {
            const categories = await requestService.category.getCategories();
            await this.fetchStuff(categories[0].name)
            this.setToStore('categories', categories)
        } catch (signInError) {
            console.log('Ошибка при получении категорий');
        }
    }

    fetchGood = async (goodId) => {
        try {
            const good = await requestService.good.getGood(goodId);
            this.setToStore('good', good)
        } catch (signInError) {
            console.log('Ошибка');
        }
    }

    @action
    setToStore = (name, data) => {
        this[name] = data;
        this.count = this.basket.length
        this.setSumma()
    }

    @action
    clearCount = () => {
        this.count = 0;
    }
}

export default BasketStore;
