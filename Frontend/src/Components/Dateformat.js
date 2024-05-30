import React from "react";



const Dateformat = ({date}) => {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }

    return (
        <>
        
        
        </>
    );
}


export default Dateformat;