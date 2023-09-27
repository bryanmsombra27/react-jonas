import Counter from "./Counter";

const CompoundComponent = () => {

    return (

        <div>
            <h1>Compound Component Pattern</h1>
            {/* <Counter
                iconIncrease="+"
                iconDecrease="-"
                label="My NOT so flexible counter"
                hideLabel={false}
                hideIncrease={false}
                hideDecrease={false}
            /> */}
            <Counter>
                <Counter.Label>super flexible component</Counter.Label>
                <Counter.Decrease icon="-"></Counter.Decrease>
                <Counter.Count />
                <Counter.Increase icon="+"></Counter.Increase>
            </Counter>
        </div>

    )

}

export default CompoundComponent;