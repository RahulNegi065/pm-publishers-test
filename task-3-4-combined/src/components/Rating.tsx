import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function Rating() {
  const [rating, setRating] = useState(0);

  const handleClick = (value:any) => {
    if (value === rating) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`https://pmponline.co.in/sdetest/requests.php`, {
        method: 'POST',
        mode: 'no-cors'
        });
        console.log(res)
      } catch (error) {
        console.error('Error making API call:', error);
      }
    })();
  }, [rating])
  

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              hidden
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
              size={40}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating