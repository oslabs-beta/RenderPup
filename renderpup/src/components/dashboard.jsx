import React from "react";
import '../stylesheets/dashboard.css';
import image_png from '../../public/image_png.png';

const dashboard = () => {
  return (
    <div>
      <h1> RenderPup</h1>
      <h3>Sniffing out performance and fetching results!</h3>
      <form className='app-form'>
        URL:
        <label>
          <input className='app-input-field' type='text' name='url' placeholder="Search"/>
        </label>
        <input className='go-fetch-bttn' type='submit' value='Go Fetch' />
      </form>
      <img id='dogFetchingBall' src={image_png} alt="dogFetchingBall" />
    </div>
  );
};

export default dashboard;
