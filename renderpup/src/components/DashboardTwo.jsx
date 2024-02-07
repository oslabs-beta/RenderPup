import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Container, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/dashboard.css';
import image_png from '../../public/image_png.png';
import renderpup from '../../public/renderpup.png';
import runningDog from '../../public/runningDog.gif';

//dashboard functionality to render 
const DashboardTwo = ({ updateState, currState }) => {
  const [open, setOpen] = useState(false);
  // use state hook to control the position of the dropdown on 'Fetch Metrics' button in navbar
  const [anchorEl, setAnchorEl] = useState(null); 
  // use state hook to handle receiving peformance metrics data 
  const [loading, setLoading] = useState(false);
  //use state hook to update url's 
  const [urlList, setUrls] = useState(new Set());
  //use navigate hook to navigate between different react components 
  const navigate = useNavigate();

  useEffect(() => {
  
    function fetchUrls() {
      fetch('/api')
      .then(response => response.json())
      .then(data => {
        let newUrl
        const uniqueUrls = new Set()
        // update url's not to include '/' with each query
        for (const url of data.urls) {
          if (url.url[url.url.length - 1] === '/') {
            const tempArr = url.url.split('')
            tempArr.splice(url.url.length - 1, 1)
            newUrl = tempArr.join('')
          }
          uniqueUrls.add(newUrl)
        }
        setUrls(uniqueUrls)
      })
      .catch(err => console.log('error in fetchUrls', err))
    }
  
    fetchUrls()
    sessionStorage.setItem("loggedIn", '/dashboard')
  }, [currState]);

  //handleOpen function opens list of user's queries saved from database on 'fetch metrics' button on navbar
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };
  //handleOpen function closes list of user's queries saved from database on 'fetch metrics' button on navbar
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

 // handleAbout function = functionality to redirect user to logout component when clicking 'About' on navbar
  const handleAbout = () => {
    navigate('/about');
  }
  // handleSignout function = functionality to redirect user to logout component when clicking 'Sign Out' on navbar
  const handleSignOut = () => {
    // navigate to logout component 
    navigate('/logout');
  }

  const buttons = []

  const urls = Array.from(urlList)
  for (let i = 0; i < urls.length; i++) {
    buttons.push(<MenuItem onClick={() => handleWebsite(`${urls[i]}`)} key={crypto.randomUUID()}>{`${urls[i]}`}</MenuItem>)
  }

  // handles logic when a user clicks on anything in the dashboard related to grabbing existing data 
    // ex. saved metrics from user when clicking 'FETCH METRICS', querying metrics from new websites when clicking 'GO FETCH' 
  const handleWebsite = async (url) => {
    const data = await getExistingData(url)
  };

  // Handle fetching new data from server
  function getNewData() {
    setLoading(true);
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
        setLoading(false);
        //then checks of status code is ok (200-299); if not, throw 404 error
        if (!response.ok) {
          console.error(`Network response is not rendering, ${response.status} error`)
          throw new Error('response not ok')
        }
        return response.json();
      })
      //use useState to access TTFB 
      .then(async data => {
        if (currState.data[0].url === 0) {
          const strippedUrl = data.data.metrics.url.slice(0, data.data.metrics.url.length - 1)
          await getExistingData(strippedUrl)
        }
        else if (data.data.metrics.url === currState.data[0].url) {
          // in order to return data back as mutable, take all data from currState as indiv elements (spread) 
          // & make new arr tempArr to store it in to be able to update state 
          const tempArr = [...currState.data]
          tempArr.push(data.data.metrics)
          const newData = {data: tempArr}
          // updates state with new data from post req that's in the same format as initial state (refer to app) 
          updateState(newData)
        }
        setLoading(false); //ends the loading time window
      })
      .catch(error => {
        console.log('UNEXPECTED ERROR: ', error);
      });
  }

  // Handle fetching existing data from server based on URL
  function getExistingData(currUrl) {
    // make a http request to /api/urls
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
        updateState(data);
      })
      .catch(error => {
        console.log('UNEXPECTED ERROR: ', error)
      });
  }

  const loadingDog = <img id='loadingDog' src={runningDog}></img>;

  return (
    //div testid for testing dashboardTwo
    <div data-testid='app-component'>
      {/* MUI functionality to render navbar */}
    <div>
      <AppBar position="static" sx={{ bgcolor: '#0496FA'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <img src={renderpup} alt="logo" style={{ height: '50px' }} />
            </Box>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              RenderPup
            </Typography>
            <Button color="inherit" onClick={handleAbout}>
              About
            </Button>
            <Button color="inherit" onClick={handleOpen}>
              Fetch Metrics
            </Button>
            <Button color="inherit" onClick={handleSignOut}>
            Sign Out
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {buttons}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

  
     <div className="slogan">
      
      <img id='dogFetchingBall' src={image_png} alt="dogFetchingBall" />
      <h3>Sniffing Out Performance and Fetching Results!</h3>
      </div>
      
      <div className="logoAndSearch">
      
      <form className='app-form'>
        <label>
          <input className='app-input-field' type='text' name='url' placeholder="Search URL"/>
        </label>
      </form><br/>

        <button className='go-fetch-bttn' type='button' onClick={getNewData}>Go Fetch</button>

      </div>
      {/* functionality that renders corgi gif after hitting 'fetch' buton */}
        { loading ? (
          <div id='loadingPage'>
            <p>Fetching...</p>
            {loadingDog} 
          </div>
          ) : null}
    </div>
    </div>
  );
};

export default DashboardTwo;
