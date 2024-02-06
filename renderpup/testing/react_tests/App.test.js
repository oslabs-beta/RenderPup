import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardTwo from '../../src/components/DashboardTwo';
import fetch from 'node-fetch';


describe('app component', () => {
  it('should render app component in react', () => {
    render(
      
        < DashboardTwo/>

      
    );
  expect(screen.getByTestId('app-component')).toBeInTheDocument();
});
});