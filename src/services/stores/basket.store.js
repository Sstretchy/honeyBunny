import { action, configure, observable } from 'mobx';
import { requestService } from '../request.service';

configure({ enforceActions: 'observed' });

class BasketStore {

    @observable
    status = false;

    @observable
    summa = 0;

    @observable
    stuff = [];

    @observable
    basket = []

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    setSumma = () => {
        this.summa = 0;
        this.basket.forEach(item => this.summa += item.count * item.price);
    }

    @action
    removeFromBasket = (index) => {
        this.basket.splice(index, 1);
        this.setSumma()
    }

    @action
    setOrder = () => {
        if (!this.status) {
            this.status = true;
        } else {
            this.status = false;
        }
    }

    @action
    addProduct = (index) => {
        const count = this.basket[index].count;
        if (count < 999) {
            this.basket[index].count++;
            this.setSumma()
        }
    }

    @action
    reduceProduct = (index) => {
        const count = this.basket[index].count;
        if (count > 1) {
            this.basket[index].count--;
        } else {
            this.removeFromBasket(index);
        }
        this.setSumma()
    }


    fetchStuff = async (category) => {
        try {
            const stuff = await requestService.good.getGoodByCategory(category);
            this.setToStore('stuff', stuff)
        } catch (signInError) {
            console.log('Категории нет в базе, ага');
        }
    }

    fetchBasket = async (userId) => {
        try {
            const basket = await requestService.basket.getBasket(userId);
            this.setToStore('basket', basket)
        } catch (signInError) {
            console.log('Ошибка при получении корзины');
        }
    }

    @action
    setToStore = (name, data) => {
        this[name] = data;
        console.log(this.basket)
    }

}

export default BasketStore;
