import "../styles/scroll-indicator.css";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ShouldRender from "./ShouldRender";

interface Props {
    condition?: boolean;
}

const ScrollIndicator = (props: Props) => {
    const {condition = true} = props;

    return (
        <ShouldRender condition={condition}>
            <div className="scroll-indicator">
                <KeyboardDoubleArrowDownIcon color={'inherit'}/>
            </div>
        </ShouldRender>
    )
};

export {ScrollIndicator};
