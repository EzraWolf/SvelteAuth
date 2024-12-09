import { writable, derived, type Writable } from 'svelte/store';
import type { z } from 'zod';

export interface Port {
  name: string;
  type: z.ZodType<any>;
  value: Writable<any>;
}

export class BaseNode {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  inputs: Record<string, Port>;
  outputs: Record<string, Port>;

  constructor(id: string, name: string, x: number, y: number, z: number) {
    this.id = id;
    this.name = name;
    this.position = { x, y, z };
    this.inputs = {};
    this.outputs = {};
  }

  addInput(key: string, name: string, type: z.ZodType<any>, defaultValue: any): void {
    this.inputs[key] = { name, type, value: writable(defaultValue) };
  }

  addOutput(key: string, name: string, type: z.ZodType<any>, observable: Writable<any>): void {
    this.outputs[key] = { name, type, value: observable };
  }

  validate(): boolean {
    try {
      Object.values(this.inputs).forEach(input => input.type.parse(input.value.get()));
      Object.values(this.outputs).forEach(output => output.type.parse(output.value.get()));
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }
}