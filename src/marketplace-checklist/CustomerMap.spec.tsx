import { shallow } from 'enzyme';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import { CustomerMap } from './CustomerMap';

jest.mock('@waldur/images/marker-icon-red.png', () => 'marker-icon-red.png');
jest.mock(
  '@waldur/images/marker-icon-yellow.png',
  () => 'marker-icon-yellow.png',
);
jest.mock(
  '@waldur/images/marker-icon-green.png',
  () => 'marker-icon-green.png',
);

const initCustomer = (props = {}) => {
  return {
    uuid: '1',
    name: 'Alex',
    score: 0,
    latitude: 49.601984,
    longitude: 95.63666172955419,
    ...props,
  };
};

describe('CustomerMap', () => {
  describe('Marker', () => {
    it('should render a red marker', () => {
      const customers = [initCustomer()];

      const component = shallow(<CustomerMap customers={customers} />);
      const icon = component.find(Marker);
      const src = icon.prop('icon');

      expect(src.options.iconUrl).toEqual('marker-icon-red.png');
    });

    it('should render a yellow marker', () => {
      const customers = [initCustomer({ score: 50 })];

      const component = shallow(<CustomerMap customers={customers} />);
      const icon = component.find(Marker);
      const src = icon.prop('icon');

      expect(src.options.iconUrl).toEqual('marker-icon-yellow.png');
    });

    it('should render a green marker', () => {
      const customers = [initCustomer({ score: 80 })];

      const component = shallow(<CustomerMap customers={customers} />);
      const icon = component.find(Marker);
      const src = icon.prop('icon');

      expect(src.options.iconUrl).toEqual('marker-icon-green.png');
    });

    it("should't render any markers", () => {
      const customers = [initCustomer({ latitude: null, longitude: null })];

      const component = shallow(<CustomerMap customers={customers} />);
      const icon = component.find(Marker);

      expect(icon).toHaveLength(0);
    });
  });

  describe('Popup', () => {
    it('should render a popup with name and score', () => {
      const customers = [initCustomer()];

      const component = shallow(<CustomerMap customers={customers} />);
      const popup = component.find(Popup);
      const icon = component.find(Marker);
      const text = popup.text();

      expect(icon).toHaveLength(1);
      expect(text).toBe('Alex: 0 %');
    });

    it("shouldn't render any popups", () => {
      const customers = [initCustomer({ latitude: null, longitude: null })];

      const component = shallow(<CustomerMap customers={customers} />);
      const popup = component.find(Popup);

      expect(popup).toHaveLength(0);
    });
  });
});
