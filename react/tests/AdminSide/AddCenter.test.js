import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddCenter from '../../components/Admin/AddCenter/AddCenter';
import { MemoryRouter } from 'react-router';

describe('AddDetails', () => {
  test('fe_react_adminAddCenter', () => {
    render(<MemoryRouter><AddCenter /></MemoryRouter>);

    const enterCenterName = screen.getByTestId('enterCenterName');
    const place = screen.getByTestId('place');
    const enterImageUrl = screen.getByTestId('enterImageUrl');
    const mobile = screen.getByTestId('mobile');

    expect(enterCenterName).toBeTruthy();
    expect(place).toBeTruthy();
    expect(enterImageUrl).toBeTruthy();
    expect(mobile).toBeTruthy();

  });
});