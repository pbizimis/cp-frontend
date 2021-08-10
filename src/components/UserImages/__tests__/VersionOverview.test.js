import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { VersionOverview } from '../VersionOverview';

describe('VersionOverview', () => {
  const mockVersionData = {
    'Images 20k, Resolution 20px, FID 20': [
      {
        url: 'url1',
      },
    ],
    'Images 30k, Resolution 30px, FID 30': [
      {
        url: 'url2',
      },
    ],
  };

  beforeAll(() => {
    const UserImages = require('../UserImages');
    UserImages.ImageContainer = jest.fn().mockReturnValue(<h1>This is a mock!</h1>);
  });

  test('that version name is displayed', () => {
    render(<VersionOverview versionName="Version1.0" versionData={mockVersionData} urlPrefix="urlPrefix" register={() => {}} radioForm={false} />);
    expect(screen.getByText('Version1.0')).toBeInTheDocument();
  });

  test('that no models are displayed in default state', () => {
    render(<VersionOverview versionName="Version1.0" versionData={mockVersionData} urlPrefix="urlPrefix" register={() => {}} radioForm={false} />);

    expect(screen.queryByText('Model: Images 20k, Resolution 20px, FID 20')).not.toBeInTheDocument();
    expect(screen.queryByText('Model: Images 30k, Resolution 30px, FID 30')).not.toBeInTheDocument();
  });

  test('that models are displayed after the button click', () => {
    render(<VersionOverview versionName="Version1.0" versionData={mockVersionData} urlPrefix="urlPrefix" register={() => {}} radioForm={false} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Model: Images 20k, Resolution 20px, FID 20')).toBeInTheDocument();
    expect(screen.getByText('Model: Images 30k, Resolution 30px, FID 30')).toBeInTheDocument();
  });

  test('that models are not displayed after the second button click (close)', () => {
    render(<VersionOverview versionName="Version1.0" versionData={mockVersionData} urlPrefix="urlPrefix" register={() => {}} radioForm={false} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.queryByText('Model: Images 20k, Resolution 20px, FID 20')).not.toBeInTheDocument();
    expect(screen.queryByText('Model: Images 30k, Resolution 30px, FID 30')).not.toBeInTheDocument();
  });
});
