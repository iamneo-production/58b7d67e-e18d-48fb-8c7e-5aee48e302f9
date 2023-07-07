import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import HomePage from '../../components/Customer/HomePage/HomePage';


describe('HomePage Component', () => {
    
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    test('fe_react_customerHome', () => {
       const  centerName = screen.queryByTestId('centerName');
       const  place = screen.queryByTestId('place');
       expect(centerName).toBeTruthy();
       expect(place).toBeTruthy();
    })

})