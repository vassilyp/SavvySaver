import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebaseConfig';
import {useNavigate} from "react-router-dom";


const Home = () => {

  const auth = getAuth(app);

  const navigate = useNavigate();

  const signOutFunction = () => {
    signOut(auth);
    navigate("/login")
  }

  return (
    <>
      <div className="w-screen h-screen grid">
        <div id="top-bar" className="flex mt-5">
          <div className="w-[33%] items-center flex">
            <button className="" onClick={signOutFunction}>Logout</button>
          </div>
          <div className="w-[33%] flex justify-center">
            <h1 className="rakkas-medium text-xl text-black">Savvy Saver</h1>
          </div>
          <div className="w-[33%] flex justify-end mr-5 items-center">
            <h3 className="text-lightyellow">Points: 123123</h3>
          </div>
        </div>

        <div
          id="challenge-progress"
          className="w-[70%] justify-center bg-white flex shadow-md rounded-xl text-black mx-auto"
        >
          <div className="w-[80%] flex flex-col justify-center text-center mt-10 mx-auto">

            <div>
              <h2 className="mt-8 rakkas-medium text-base font-bold">
                Cut Down Food Spending To $30
              </h2>

              <h2 className="text-xl rakkas-medium font-bold">
              EARN <span className="text-gold">35</span> POINTS
            </h2>
              <p className="mt-2 text-balance text-base">Day 1 of 7</p>

              {/* Centering the paragraph */}
              <div className="flex justify-center">
                <p className="mt-7 mb-10 text-xl rakkas-medium font-bold bg-black text-white rounded-xl w-[80%] text-center">
                  $50 out of $100 left!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="in-depth-report"
          className="m-16 px-10 pb-10 w-[70%] justify-center bg-white shadow-md rounded-xl text-black mx-auto "
        >
          <h2 className="mt-8 text-xl font-bold rakkas-bold text-center">
            Your Financial Report
          </h2>

          <div className="mt-10">
            <h3 className="text-lg rakkas-medium">Spending</h3>
            <p className="mt-1 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              justo eros, vestibulum id sem in, mattis congue elit. Vivamus
              lacus velit, tristique sed sodales non, tristique non ante. Nulla
              interdum mauris sit amet tempor molestie. Cras nec mi non quam
              tincidunt rutrum. Nulla aliquet suscipit nulla. Vestibulum commodo
              consequat nulla. Quisque pharetra elementum neque sit amet
              suscipit. Phasellus tincidunt feugiat commodo. Sed sodales finibus
              vulputate. Nunc non odio porta, commodo tortor ut, iaculis est.
              Nulla euismod velit facilisis, ornare urna vel, tempor dolor.
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-lg rakkas-medium">Investing</h3>
            <p className="mt-1 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              justo eros, vestibulum id sem in, mattis congue elit. Vivamus
              lacus velit, tristique sed sodales non, tristique non ante. Nulla
              interdum mauris sit amet tempor molestie. Cras nec mi non quam
              tincidunt rutrum. Nulla aliquet suscipit nulla. Vestibulum commodo
              consequat nulla. Quisque pharetra elementum neque sit amet
              suscipit. Phasellus tincidunt feugiat commodo. Sed sodales finibus
              vulputate. Nunc non odio porta, commodo tortor ut, iaculis est.
              Nulla euismod velit facilisis, ornare urna vel, tempor dolor.
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-lg rakkas-medium">Saving</h3>
            <p className="mt-1 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              justo eros, vestibulum id sem in, mattis congue elit. Vivamus
              lacus velit, tristique sed sodales non, tristique non ante. Nulla
              interdum mauris sit amet tempor molestie. Cras nec mi non quam
              tincidunt rutrum. Nulla aliquet suscipit nulla. Vestibulum commodo
              consequat nulla. Quisque pharetra elementum neque sit amet
              suscipit. Phasellus tincidunt feugiat commodo. Sed sodales finibus
              vulputate. Nunc non odio porta, commodo tortor ut, iaculis est.
              Nulla euismod velit facilisis, ornare urna vel, tempor dolor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
