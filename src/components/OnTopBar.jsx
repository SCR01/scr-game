import React, { useEffect } from "react";
import { ArrowBigUp } from "lucide-react";
import Styled from "styled-components";

const OnTopBar = () => {
const [isvisible, setIsVisible] = React.useState(false);
  
const onTopbtn = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // Define the scroll event handler function *****
  const handleScroll = () => {
    document.querySelector(".on-top-bar") 
    if (window.scrollY > 100) {
       setIsVisible(true);
    } else {
        setIsVisible(false);
    }
  }

  // Render the component AS useEffect 
useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container>
        { isvisible && (
      <div className="on-top-bar" onClick={onTopbtn}>
        <ArrowBigUp />
      </div>
        )
}
    </Container>
  );
};

const Container = Styled.section`
   display: flex;
   justify-content: center;
    align-items: center;

.on-top-bar {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #fff;
    color: #1a1a1a;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
 

    &:hover {
        background-color: #0039df;
    }
 
}

`;

export default OnTopBar;