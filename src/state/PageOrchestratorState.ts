import {getPage, SupportedPage} from "../metadata/pages.metadata";
import {autorun, makeAutoObservable} from "mobx";
import _ from "lodash";

export const pageOrder: SupportedPage[] = [
    'monologue',
    'birthday_wishes',
    'trivia',
    'spider'
];

class PageOrchestratorState {
    activePage: SupportedPage  = pageOrder[0];
    isStarted: boolean = false;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
        autorun(() => {
            // console.log(this.activePage);
            // console.log(this.activePageIndex);
        });
    }

    get previousPage() {
        return this.activePageIndex > 0 ? pageOrder[this.activePageIndex - 1] : undefined;
    }

    get nextPage() {
        return this.activePageIndex < pageOrder.length - 1 ? pageOrder[this.activePageIndex + 1] : undefined;
    }

    get activePageIndex() {
        return _.findIndex(pageOrder, p => p === this.activePage);
    }

    get activePageState() {
        return getPage(this.activePage).state;
    }

    start() {
        this.isStarted = true;
        this._setPage(0);
    }

    end() {
        this.isStarted = false;
        this._setPage(0);
    }

    next() {
        if (this.activePageIndex >= pageOrder.length - 1) {
            this.end();
        } else {
            this._setPage(this.activePageIndex + 1);
        }
    }

    previous() {
        if (this.activePageIndex < 1) {
            this.end();
        } else {
            this._setPage(this.activePageIndex - 1);
        }
    }

    setPage(page: SupportedPage) {
        const index = _.findIndex(pageOrder, p => page === p);
        if(index >= 0) {
            this._setPage(index);
        }
    }

    private _setPage(pageIndex: number) {
        if (pageIndex < 0 || pageIndex >= pageOrder.length) return;

        this.activePage = pageOrder[pageIndex];
        this.activePageState.scrollIntoView();
    }
}

export {PageOrchestratorState};
