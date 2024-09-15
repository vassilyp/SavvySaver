const Home = () => {

  return (
    <>
      <div id='top-bar' class="flex mt-5">
        <div class="w-[33%] items-center flex"></div>
        <div class='w-[33%] flex justify-center'>
          <h1 class='text-xl'>Savvy Saver</h1>
        </div>
        {/* TODO: connect backend */}
        <div class="w-[33%] flex justify-end mr-5 items-center">
          <h3 class="">Points: 123123</h3>
        </div>
      </div>

      <div id='challenge-progress' class="flex justify-center text-lightyellow">
        <div class="w-[80%] flex flex-col justify-center text-center mt-10">
          <h2>Challenge progress</h2>
          {/* TODO: connect to backend */}
          <progress value={0.5} />
          <div>
            {/* TODO: connect these to backend */}
            <p>Day 1 of 7</p>
            <p>50$ out of 100$ left!</p>
          </div>
        </div>
      </div>

      <div id='in-depth-report' class='m-20'>
        <h2 class='mb-5 text-lg'>In depth report</h2>
        <p class="text-sm">
          {/* TODO: Integrate ChatGPT equivalent */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo eros, vestibulum id sem in, mattis congue elit. Vivamus lacus velit, tristique sed sodales non, tristique non ante. Nulla interdum mauris sit amet tempor molestie. Cras nec mi non quam tincidunt rutrum. Nulla aliquet suscipit nulla. Vestibulum commodo consequat nulla. Quisque pharetra elementum neque sit amet suscipit. Phasellus tincidunt feugiat commodo. Sed sodales finibus vulputate. Nunc non odio porta, commodo tortor ut, iaculis est. Nulla euismod velit facilisis, ornare urna vel, tempor dolor. Curabitur non tortor eu risus pellentesque condimentum in mattis turpis. Phasellus eget lacinia massa.
        </p>
      </div>
    </>
  )
}

export default Home;
