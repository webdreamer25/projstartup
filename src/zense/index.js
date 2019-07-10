import Behavior from './behavior';
import Composite from './composite';
import Component from './component';
import Module from './module';

const root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global ||
  this ||
  {};

export {
  Behavior,
  Composite,
  Component,
  Module
};
