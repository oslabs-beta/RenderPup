import React from "react";
import '../stylesheets/dashboard.css';
import image_png from '../../public/image_png.png';
import renderpup from '../../public/renderpup.png';

const dashboard = ({updateState, currState, urlList}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleWebsite = async (url) => {
    const data = await fetchData(url)
    console.log(`Metrics for ${url}`, data)
    // setOpen(false);
  };

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
          throw new Error('response not ok')
        }
        return response.json();
      })
      //use useState to access TTFB 
      .then(data => {
        const tempArr = [...currState.data]
        tempArr.push(data.data)
        const newData = {data: tempArr}
        updateState(newData)
      })
      .catch(error => {
        console.log('UNEXPECTED ERROR: ', error)
      });
  }

  function fetchData(currUrl) {
    console.log('in Fetch d')
    // make a http request to /api
    fetch('/api/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: currUrl}),
    })
      .then(response => {
        //then checks of status code is ok (200-299); if not, throw 404 error
        if (!response.ok) {
          console.error(`Network response is not rendering, ${response.status} error`)
          throw new Error('response not okay')
        }
        return response.json();
      })
      //use useState to access TTFB 
      .then(data => {
        // console.log("SEE YOUR DATA", data);
        console.log('heres the data: ', data)
        updateState(data);
      })
      .catch(error => {
        console.log('UNEXPECTED ERROR: ', error)
      });
  }

  const buttons = []
  console.log('buttons:', buttons);
  console.log('urlList:', urlList);
  const urls = Array.from(urlList)
  for (let i = 0; i < urls.length; i++) {
    // buttons.push(<li className="site-name"></li>)
    buttons.push(<button className='saved-urls' onClick={() => handleWebsite(`${urls[i]}`)} key={crypto.randomUUID()}>{`${urls[i]}`}</button>)
  }

  return (
    <div>
      <h1> RenderPup</h1>
      <div className="slogan">
      
      <img id='dogFetchingBall' src={image_png} alt="dogFetchingBall" />
      <h3>Sniffing Out Performance and Fetching Results!</h3>
      </div>
      
      <div className="logoAndSearch">
      <img id='logo' src={renderpup} alt="logo" />
      <form className='app-form'>
        <label>
          <input className='app-input-field' type='text' name='url' placeholder="Search URL"/>
        </label>
      </form><br/>
        <button className='go-fetch-bttn' type='button' onClick={getData}>Go Fetch</button>
      </div>

        <div className ="dropdown">
          <button onClick={handleOpen}>Fetch Performance Metrics from Websites Saved on Your Database!</button>
          { open ? (
            <ul className ="firstSite">
              {buttons}
              {/* <li className="site-name"></li> */}
              {/* <button onClick={() => handleWebsite('1st website')}>1st Website</button>< br/><br/> */}
              {/* <li className="site-name2"></li> */}
              {/* <button onClick={handleWebsite2}>2nd Website</button> */}
            </ul>
          ) : null}    
        </div>
     
    </div>
  );
};

export default dashboard;
