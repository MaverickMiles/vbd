import React, {FunctionComponent} from 'react';

interface Props {
    children: React.ReactNode;
    condition: boolean;
    fallback?: FunctionComponent;
    collapseIn?: boolean;
}

const ShouldRender = (props: Props) => {
    const {condition, fallback, collapseIn = false} = props;

    if (!condition) {
        if (!fallback) return null;
        const FallbackComponent = fallback;
        return <FallbackComponent/>;
    }

    return <React.Fragment>{props.children}</React.Fragment>;
};

export default ShouldRender;
