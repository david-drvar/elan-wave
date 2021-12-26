import React from 'react';


const Footer = () => {
    const mystyle = {
        position: "fixed",
        padding: "10px 10px 0px 10px",
        bottom: "0",
        width: "100%",
        height: "70px",
        background: "#808B96",
      };
      
    return (
        <div style={mystyle}>
            <a href="https://www.elanwave.com" style={{color : "#2C3E50", float : "right", marginRight : "40px",textDecoration: "underline", marginTop : "10px"}}>www.elanwave.com </a>
        </div>
    )
}

export default Footer;