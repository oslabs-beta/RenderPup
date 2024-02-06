import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../../src/components/SignIn';

// async function withFetch() {
//     const res = await fetch('/api/login')
//     const json = await res.json()
  
//     return json
//   }
  
//   // This is the section where we mock `fetch`
//   const unmockedFetch = global.fetch
  
//   beforeAll(() => {
//     global.fetch = () =>
//       Promise.resolve({
//         json: () => Promise.resolve([]),
//       })
//   })
  
//   afterAll(() => {
//     global.fetch = unmockedFetch
//   })
  
//   // This is actual testing suite
//   describe('withFetch', () => {
//     test('works', async () => {
//       const json = await withFetch()
//       expect(Array.isArray(json)).toBe(true)
      
//     })
//   })

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


