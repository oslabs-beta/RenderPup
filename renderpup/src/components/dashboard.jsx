import React from "react";
import '../stylesheets/dashboard.css';
import image_png from '../../public/image_png.png';

const dashboard = (props) => {

  function getData() {

    //grabs data from search bar and clears it
    const urlField = document.querySelector('.app-input-field')
    let currUrl = urlField.value
    urlField.value = ''

    currUrl = JSON.stringify({url: currUrl})

    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: currUrl,
    })
      .then(response => {
        //then checks of status code is ok (200-299); if not, throw 404 error
        console.log(response)
        if (!response.ok) {
          console.error(`Network response is not rendering, ${response.status} error`)
        }
        return response.json();
      })
      //use useState to access TTFB 
      .then(data => {
        const tempArr = [...props.currState.data]
        tempArr.push(data.data)
        const newData = {data: tempArr}
        props.updateState(newData)
      })
      .catch(error => {
        console.log('UNEXPECTED ERROR: ', error)
      });
  }

  return (
    <div>
      <h1> RenderPup</h1>
      <div className="slogan">
      <img id='dogFetchingBall' src={image_png} alt="dogFetchingBall" />
      <h3>Sniffing out performance and fetching results!</h3>
      </div>
      <form className='app-form'>
        URL:
        <label>
          <input className='app-input-field' type='text' name='url' placeholder="Search"/>
        </label>
        <button className='go-fetch-bttn' type='button' onClick={getData}>'Go Fetch'</button>
      </form>
    </div>
  );
};

export default dashboard;
