import {getPage, SupportedPage} from "../metadata/pages.metadata";
import {autorun, makeAutoObservable} from "mobx";
import _ from "lodash";
import {PageState} from "./PageState";
import {createRef, RefObject} from "react";
import {toggleFullscreen} from "../utils/dom.utils";

export const pageOrder: SupportedPage[] = [
    'monologue',
    'trivia',
];

class PageOrchestratorState {
    activePage: SupportedPage  = pageOrder[0];
    isStarted: boolean = false;
    pages: PageState[] = [];
    scrollContainerRef = createRef<HTMLDivElement>();

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    get activePages() {
        return [];
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

    lock() {
        const scrollContainer = this.scrollContainerRef.current;
        if (!scrollContainer) return;
        scrollContainer.style.overflow = 'hidden';
    }

    unlock() {
        const scrollContainer = this.scrollContainerRef.current;
        if (!scrollContainer) return;
        scrollContainer.style.overflow = 'scroll';
    }
}

export {PageOrchestratorState};
