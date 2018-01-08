import React from 'react';
import MapArray from '../../src';
import { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';

const Item = ({key, value}) => <li key={key}>{value}</li>;

describe('MapArray', () => {
  it('exports a component', () => {
    expect(MapArray).to.exist;
  });

  describe('Component', () => {
    let _component;
    let from = [
      {className: 'red'},
      {className: 'blue'},
      {className: 'purple'}
    ];

    // https://daveceddia.com/testing-for-proptypes-errors/
    it('Requires from prop', () => {
      sinon.stub(console, 'error');
      _component = shallow(
        <ul>
          <MapArray>
            <li />
          </MapArray>
        </ul>
      );
      sinon.assert.callCount(console.error, 1);
      console.error.restore();
    });

    // https://stackoverflow.com/a/43440336/6732764
    it('Requires exactly one child', () => {
      sinon.stub(console, 'error');
      // Warning: Failed prop type: The prop `children` is marked as required in `MapArray`, but its value is `undefined`.
      expect(() => shallow(<MapArray from={from}/>)).to.throw();
      // Warning: Failed prop type: Invalid prop `children` of type `array` supplied to `MapArray`, expected a single ReactElement.
      expect(() => shallow(<MapArray from={from}><li /><li /></MapArray>)).to.throw();
      sinon.assert.callCount(console.error, 2);
      console.error.restore();
    });

    describe('Maps over an array of prop objects', () => {
      it('with default map fn', () => {
        _component = render(
          <ul>
          <MapArray from={from}>
            <li />
          </MapArray>
          </ul>
        );
        expect(_component).to.have.exactly(3).descendants('li');
      });

      it('with custom map fn', () => {
        const map = (v) => {
          return {
            ...v,
            className: 'orange'
          };
        };
        _component = mount(
          <ul>
          <MapArray from={from} map={map}>
            <li />
          </MapArray>
          </ul>
        );
        _component.find('li').forEach(node => {
          expect(node.hasClass('orange')).to.equal(true);
        });
      });

    });
  });
});
