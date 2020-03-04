import BasketStore from './basket.store';
import { configure } from 'mobx';

configure({ enforceActions: 'observed' });

class RootStore {
    constructor() {
        this.basket = new BasketStore(this);
    }
}

export default new RootStore();