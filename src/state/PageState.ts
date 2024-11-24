import {makeAutoObservable} from "mobx";

export class PageState {
    pageViewCount = 0;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    get pageViewedAtleastOnce() {
        return this.pageViewCount > 0;
    }

    get pageCompleted() {
        return false;
    }

    incrementPageViewCount() {

    }

    onPageBegin() {
    }

    onPageEnd() {
    }
}