import React from 'react';
import styled from 'styled-components';

const Scroll = (showBellow) => {
    // const [show, setShow] = useState(false)

    // const handleScroll = () => {
    //     if (window.scrollY > showBellow){
    //         if (!show) setShow(true)
    //     } else {
    //         if (show) setShow(false)
    //     }
    // }
    const backToTop = () => {
        window.scrollTo({
        top:0, 
        behavior: 'smooth'
     })
     }
    //  useEffect(() => {
    //   if(scrollY >250){
    //     //   window.addEventListener('scroll', handleScroll)
    //     //   return () => window.removeEventListener('scroll', handleScroll)
    //     setShow(true)
    //   } else {
    //       setShow(false)
    //   }
    //  }, [scrollY])

    return (
        <Button> 
            {/* { show && */}
            <button onClick={backToTop} > Back to top</button>
            {/* }  */}
        </Button>
    
    )
}

export default Scroll

const Button = styled.button`
.backToTop{
position: fixed;
bottom: 15px;
right: 25px;
border-radius: 50%;
width: 60px;
height:60px;
/* opacity: 0; */
transition: all 0.4s;
}
`
