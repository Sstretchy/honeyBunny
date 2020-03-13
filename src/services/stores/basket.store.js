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
    basket = [];

    @observable
    count = 0;

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
    removeFromBasket = async (itemId) => {
        try {
            await requestService.basket.deleteFromBasket(itemId);
            const basket = await requestService.basket.getBasket(this.user_id);
            this.setToStore('basket', basket)
        } catch (signInError) {
            console.log('Ошибка удаления');
        }
    }

    @action
    addProduct = async (item_id, amount) => {
        try {
            await requestService.basket.putBasket(item_id, { amount });
            const basket = await requestService.basket.getBasket(this.user_id);
            this.setToStore('basket', basket)
        } catch (signInError) {
            console.log('Ошибка при получении корзины');
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
            ToastService.notify('Войдите, чтобы начать делать покупки');
        }
    }

    @action
    reduceProduct = async (item_id, amount) => {
        if (amount) {
            try {
                await requestService.basket.putBasket(item_id, { amount });
                const basket = await requestService.basket.getBasket(this.user_id);
                this.setToStore('basket', basket)
            } catch (signInError) {
                console.log('Ошибка при получении корзины');
            }
        } else {
            await this.removeFromBasket(item_id)
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
