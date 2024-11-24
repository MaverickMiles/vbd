// import "flip.js";
// const $: any = require('jquery');
import React, {ReactNode, useEffect, useRef} from 'react';
import styled from "styled-components";

const width = 461;
const height = 600;
const options = {
    width: width,
    height: height,
    autoCenter: true,
    display: "double",
    acceleration: true,
    elevation: 50,
    // gradients: !$.isTouch,
    // when: {
    //     turned: function (e: any, page: any) {
    //         // console.log("Current view: ", $(this).turn("view"));
    //     }
    // }
};

const FlipBookContainer = styled.div`

`


interface Props {
    children: ReactNode;
}
const Turn = (props: Props) => {
    const flipbookRef = useRef(null);

    useEffect(() => {
        // $("#flipbook").turn({
        //     width: 400,
        //     height: 300,
        //     autoCenter: true
        // });
    }, []);

    return (
        <FlipBookContainer ref={flipbookRef} id={'flipbook'}>
            {props.children}
        </FlipBookContainer>
    );
};

export {Turn};
