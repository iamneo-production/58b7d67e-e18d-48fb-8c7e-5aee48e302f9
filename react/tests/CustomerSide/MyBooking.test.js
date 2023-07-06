import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Booking from '../../components/Customer/Cart/Cart';


describe('Booking', () => {
    
    render(<MemoryRouter><Booking /></MemoryRouter>)

    test('fe_react_customerBookings', () => {
       const  booking = screen.queryByTestId('cancelBooking');
	   
	   expect(booking).toBeTruthy();
    })

})