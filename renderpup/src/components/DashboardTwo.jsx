import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Container, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/dashboard.css';
import image_png from '../../public/image_png.png';
import renderpup from '../../public/renderpup.png';
import runningDog from '../../public/runningDog.gif';


const DashboardTwo = ({ updateState, currState, urlList }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For controlling the position of the dropdown
  const [loading, setLoading] = useState(false);
  
  //invoke useNavigate hook on top level of react function
  const navigate = useNavigate();
  
  // functionality to handle sign out button on line 134
  const handleSignOut = () => {
    navigate('/logout');
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // const buttons = urlList.map((url, index) => (
  //   <MenuItem key={index} onClick={() => handleWebsite(url)}>{url}</MenuItem>
  // ));

  const buttons = []

  const urls = Array.from(urlList)
  for (let i = 0; i < urls.length; i++) {
    // buttons.push(<li className="site-name"></li>)
    buttons.push(<MenuItem onClick={() => handleWebsite(`${urls[i]}`)} key={crypto.randomUUID()}>{`${urls[i]}`}</MenuItem>)
  }

  const handleWebsite = async (url) => {
    const data = await getExistingData(url)
    // setOpen(false);
  };

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
          console.log(newData)
          // updates state with new data from post req that's in the same format as initial state (refer to app) 
          updateState(newData)
        }
        setLoading(false); //ends the loading time window
      })
      .catch(error => {
        console.log('UNEXPECTED ERROR: ', error);
      });
  }

  function getExistingData(currUrl) {
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
        updateState(data);
      })
      .catch(error => {
        console.log('UNEXPECTED ERROR: ', error)
      });
  }

  const loadingDog = <img id='loadingDog' src={runningDog}></img>;

  return (
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

      {/* <h1> RenderPup</h1> */}
     <div className="slogan">
      
      <img id='dogFetchingBall' src={image_png} alt="dogFetchingBall" />
      <h3>Sniffing Out Performance and Fetching Results!</h3>
      </div>
      
      <div className="logoAndSearch">
      {/* <img id='logo' src={renderpup} alt="logo" /> */}
      <form className='app-form'>
        <label>
          <input className='app-input-field' type='text' name='url' placeholder="Search URL"/>
        </label>
      </form><br/>

        <button className='go-fetch-bttn' type='button' onClick={getNewData}>Go Fetch</button>

      </div>
      
        { loading ? (
          <div id='loadingPage'>
            <p>Fetching...</p>
            {loadingDog} 
          </div>
          ) : null}
    </div>
  );
};

export default DashboardTwo;
