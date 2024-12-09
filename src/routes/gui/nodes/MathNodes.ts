import { BaseNode } from './BaseNode';
import { derived } from 'svelte/store';
import { z } from 'zod';

const NumberSchema = z.number();

export class AdditionNode extends BaseNode {
  constructor(id: string, x: number, y: number, z: number) {
    super(id, 'Addition', x, y, z);
    this.addInput('a', 'A', NumberSchema, 0);
    this.addInput('b', 'B', NumberSchema, 0);

    const output = derived(
      [this.inputs.a.value, this.inputs.b.value],
      ([$a, $b]) => $a + $b
    );

    this.addOutput('output', 'Output', NumberSchema, output);
  }
}

export class SubtractionNode extends BaseNode {
  constructor(id: string, x: number, y: number, z: number) {
    super(id, 'Subtraction', x, y, z);
    this.addInput('a', 'A', NumberSchema, 0);
    this.addInput('b', 'B', NumberSchema, 0);

    const output = derived(
      [this.inputs.a.value, this.inputs.b.value],
      ([$a, $b]) => $a - $b
    );

    this.addOutput('output', 'Output', NumberSchema, output);
  }
}