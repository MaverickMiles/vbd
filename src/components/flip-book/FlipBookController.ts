import {IEventProps} from "react-pageflip/build/html-flip-book/settings";
import {autorun, makeAutoObservable} from "mobx";
import {createRef, RefObject} from "react";
import {pages} from "../../metadata/book.metadata";

interface PageFlipState {
    pageFlip: () => {
        flip: (page: number, corner: 'top' | 'bottom') => void;
        flipNext: () => void;
        flipPrev: () => void;
        getCurrentPageIndex: () => number;
        getPageCount: () => number;
    }
}

class FlipBookController implements IEventProps {
    pageNumber: number = 0;
    ref: RefObject<PageFlipState> = createRef();
    fromSlider = false;

    constructor() {
        makeAutoObservable(this, {ref: false}, {autoBind: true});
        autorun(() => {
            // console.log({page: this.pageNumber, totalPages: this.numOfPages});
        });
    }

    get numOfPages() {
        return pages.length;
    }

    get isCover() {
        return this.pageNumber === 0 || this.pageNumber === this.numOfPages - 1;
    }

    get sliderMarks() {
        return [
            // _.findIndex(pages, p => p.type === 'section' && p)
        ];
    }

    onSliderChange(evt: any) {
        const flipBookState = this.ref.current;
        if (!flipBookState) return;
        const target = evt.target.value;
        // console.log({target});
        this.setPageNumber(target, true);
        // account for double page on slide
        flipBookState.pageFlip().flip(target, 'bottom');
    }

    onFlip = (flipEvent: any) => {
        // console.log('onFlip', {flipEvent});
        if (this.fromSlider) {
            this.fromSlider = false;
            return;
        }
        this.updatePageNumber();
    }

    onChangeOrientation = (flipEvent: any) => {
        // console.log('onChangeOrientation', {flipEvent});
    }

    onChangeState = (flipEvent: any) => {
        // console.log('onChangeState', {flipEvent});
        // this.updatePageNumber();
    }

    onInit = (flipEvent: any) => {
        // console.log('onInit', {flipEvent})
    }

    onUpdate = (flipEvent: any) => {
        // console.log('onUpdate', {flipEvent})
    }

    updatePageNumber() {
        if (!this.ref.current) return;
        // console.log({result: this.ref.current});
        const result = this.ref.current;
        const newPageNumber = result.pageFlip().getCurrentPageIndex();
        // console.log({newPageNumber});
        this.setPageNumber(newPageNumber);
    }

    setPageNumber(pageNumber: number, fromSlider: boolean = false) {
        this.pageNumber = pageNumber;
        this.fromSlider = fromSlider;
    }
}

export {FlipBookController};
