import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../../src/components/SignIn';


describe("Testing button type in SignIn component", () => {
    it("button has type attribute set to 'submit'", () => {
      // Render the SignIn button on the signin page within a BrowserRouter
      const { getByText } = render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );
  
      // Get the button element by its text content
      const signInButton = getByText('Sign In');
  
      // Assert that the button has type attribute set to 'submit'
      expect(signInButton).toHaveAttribute('type', 'submit');
    });
  });


