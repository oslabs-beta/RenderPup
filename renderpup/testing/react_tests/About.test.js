import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../../src/components/About';


describe('About component', () => {
  // Render render button in about component
  it('should render button in About component', () => {
    render(
        <BrowserRouter>
          < About /> 
        </BrowserRouter>
    );
    // Test button tag
    const button = screen.getByText('Back to Dashboard');
    expect(button).toBeInTheDocument();

    // Use getByAltText to find the image by its alt text 
    const image = screen.getByAltText('Charmie');

    // Assert that the image is in the document
    expect(image).toBeInTheDocument();
});
});

