import React from "react";



const Dismis = ({ alert }) => {
    return (
        <>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{alert}</strong> 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

        </>
    );
}

export default Dismis;