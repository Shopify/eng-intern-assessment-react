import React, { useEffect, useState } from "react";
import RadialSegment from "./RadialSegment";

type Props = {
    children: typeof RadialSegment;
}

export default function RadialSegmentProvider({children}: Props) {

    const [state, setState] = useState(0);
    const [intervalValue, setIntervalValue] = useState(1000);

    useEffect(()=>{
        setInterval(() => {
            setState((state + 1) % 1);
        });
    });

    return children;

}

// class ChangingProgressProvider extends React.Component {
//   static defaultProps = {
//     interval: 1000
//   };

//   state = {
//     valuesIndex: 0
//   };

//   componentDidMount() {
//     setInterval(() => {
//       this.setState({
//         valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
//       });
//     }, this.props.interval);
//   }

//   render() {
//     return this.props.children(this.props.values[this.state.valuesIndex]);
//   }
// }

//export default ChangingProgressProvider;
