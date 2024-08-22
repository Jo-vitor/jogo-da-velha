import React from "react";

const Caixa = (props) => {
    return (
        <div className="caixa" onClick={props.click}>
            {props.valor}
        </div>
    );
};



export default Caixa;