import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardTwo from '../../src/components/DashboardTwo';

describe('DashboardTwo component', () => {
  // // Render the DashboardTwo component within a BrowserRouter
  it('should render DashboardTwo component', () => {
    render(
        <BrowserRouter>
          < DashboardTwo/> 
        </BrowserRouter>
    );
    // tests whether div in DashboardTwo labaled "dashboard-component"
    // use the screen object provided by @testing-library/react directly to access query functions such as getByRole, getByText, getByTestId, etc, 
   expect(screen.getByTestId('dashboard-component')).toBeInTheDocument();
});
});

describe('DashboardTwo component', () => {
  // // Render render DashboardTwo h3 tag in react
  it('should render DashboardTwo h3 tag in react', () => {
    render(
        <BrowserRouter>
          < DashboardTwo/> 
        </BrowserRouter>
    );
    // Test h3 tag
    const h3 = screen.getByText('Sniffing Out Performance and Fetching Results!');
    expect(h3).toBeInTheDocument();
});
});



