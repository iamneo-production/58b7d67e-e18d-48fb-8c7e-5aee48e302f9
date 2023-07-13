import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Service from '../../components/Admin/Service/Service';


describe('Service Component', () => {
    
    render(<MemoryRouter><Service /></MemoryRouter>)

    test('adminService', () => {
       const  customerName = screen.queryByTestId('customerName');

       expect(customerName).toBeTruthy();
    })

})