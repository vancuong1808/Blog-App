/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from 'mongoose';

const timestampPlugin = function(schema: Schema, _options: any) {
  schema.pre('save', function(this, next, _preSaveOptions) {
    console.log('Pre Save hook');
    this.createdAt = (new Date()).toISOString();
    next();
  });
};

export {
  timestampPlugin,
};
