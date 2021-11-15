import {FaStar} from 'react-icons/fa'



const Rating = () => {
    const  stars = Array(5).fill(0)
    return (
        <div>
            {stars.map((_,index) =>
                <FaStar key={index} />
            )}
        </div>
    )
}

export default Rating
