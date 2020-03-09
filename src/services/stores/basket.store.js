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
    stuff = [];

    @observable
    basket = [];

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
            try {
                console.log(this.user_id, good_id)
                await requestService.basket.postBasket({ amount: 1, user_id: this.user_id, good_id });
                const basket = await requestService.basket.getBasket(this.user_id);
                this.setToStore('basket', basket)
            } catch (signInError) {
                console.log('Ошибка при получении корзины');
            }
        } else {
            ToastService.notify('Войдите, чтобы начать покупки');
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

    @action
    setToStore = (name, data) => {
        this[name] = data;
        this.setSumma()
        console.log(this.basket)
    }

}

export default BasketStore;
