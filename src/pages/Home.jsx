import { useEffect, useState } from "react";
import secrets from '../secrets.json'; 

export const Home = () => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPoints = async () => {
    setLoading(true);
    const response = await fetch("https://paywithpretendpointsapi.onrender.com/api/v1/loyalty/37/points", {
    headers: {
      "Authorization": `Bearer ${secrets.RBC_API_KEY}`
    }
    })
    const json = await response.json()
    console.log("response is", json)
    setPoints(json.balance);
    setLoading(false);
  };

  // useEffect to call getPoints on component mount
  useEffect(() => {
    getPoints();
  }, []);

  if(loading){
    return <div> Loading!</div>
  }
  return (
    <>
      <div id='top-bar'>
        {/* TODO: connect backend */}
        <h3>Points: {points}</h3>
      </div>

      <div id='challenge-progress'>
        <h2>Challenge progress</h2>
        {/* TODO: connect to backend */}
        <progress value={0.5} />
        <div>
          {/* TODO: connect these to backend */}
          <p>Day 1 of 7</p>
          <p>50$ out of 100$ left!</p>
        </div>
      </div>

      <div id='in-depth-report'>
        <h2>In depth report</h2>
        <p>
          {/* TODO: Integrate ChatGPT equivalent */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo eros, vestibulum id sem in, mattis congue elit. Vivamus lacus velit, tristique sed sodales non, tristique non ante. Nulla interdum mauris sit amet tempor molestie. Cras nec mi non quam tincidunt rutrum. Nulla aliquet suscipit nulla. Vestibulum commodo consequat nulla. Quisque pharetra elementum neque sit amet suscipit. Phasellus tincidunt feugiat commodo. Sed sodales finibus vulputate. Nunc non odio porta, commodo tortor ut, iaculis est. Nulla euismod velit facilisis, ornare urna vel, tempor dolor. Curabitur non tortor eu risus pellentesque condimentum in mattis turpis. Phasellus eget lacinia massa.
        </p>
      </div>
    </>
  )
}

export default Home;
