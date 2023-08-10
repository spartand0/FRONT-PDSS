import renderer from 'react-test-renderer';
import React from 'react';
import PdssTitle from './PdssTitle';

const renderTree = tree => renderer.create(tree);
describe('<PdssTitle>', () => {
  it('should render component', () => {
    expect(renderTree(<PdssTitle 
    />).toJSON()).toMatchSnapshot();
  });
  
});