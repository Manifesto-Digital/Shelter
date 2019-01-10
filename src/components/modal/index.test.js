import React from 'react';
import ReactModal from 'react-modal';
import Modal from '.';
import { mountWithTheme } from '../../../__tests__/helpers';

const getCss = node =>
  window
    .getComputedStyle(node)
    .cssText.split(';')
    .join(';\n');

it('renders correct styles', () => {
  const wrapper = mountWithTheme(<Modal isOpen />);

  const { overlay, content } = wrapper.find(ReactModal).instance().portal;

  expect(getCss(overlay)).toMatchSnapshot('overlay');
  expect(getCss(content)).toMatchSnapshot('content');
});

it('requests to close when clicking the close button', () => {
  const onRequestClose = jest.fn();
  const wrapper = mountWithTheme(
    <Modal isOpen onRequestClose={onRequestClose} />
  );

  wrapper
    .find(ReactModal)
    .find('button[title="Close"]')
    .simulate('click');

  expect(onRequestClose).toHaveBeenCalledTimes(1);
});
