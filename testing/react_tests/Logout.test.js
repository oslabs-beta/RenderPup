import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logout from '../../src/components/Logout';

describe('Logout component', () => {
  it('should render an image element', () => {
    // Render the Logout component within a BrowserRouter
    //getByRole = built in function in react testing library that allows you to find an element
    // must be deconstructed from the result of the render function to use 
    // alternatively, can you 'screen' keyword in react testing library without needing to deconstruct getByRole
      // as in DashboardTwo react tests 
    const { getByRole } = render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    // Get the image element by its role
    const dogWavingBye = getByRole('img');

    // Assert that the image element is present
    expect(dogWavingBye).toBeInTheDocument();
  });
});


