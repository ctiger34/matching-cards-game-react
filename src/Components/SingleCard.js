import "./SingleCard.css"

export const SingleCard = ({club, HandleChoice, flipped, disabled}) => {


    const handleClick = () => {
      if(!disabled){
        HandleChoice(club)
      }
    }

    return (
     <div className='card'>
             <div className={flipped ? "flipped" : ""}>
               <img className='front' src={club.src} alt='card front' />
               <img 
                onClick={handleClick}
                className='back' 
                src='./img/cover1.png' 
                alt='cover' />
             </div>
          
        </div>
    )
}

