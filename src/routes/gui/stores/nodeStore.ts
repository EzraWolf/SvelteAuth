import { writable } from 'svelte/store';
import type { BaseNode } from '../nodes/BaseNode';

export const nodes = writable<BaseNode[]>([]);
export const connections = writable<{ from: string; to: string }[]>([]);

export function addNode(node: BaseNode) {
  nodes.update(n => [...n, node]);
}

export function removeNode(id: string) {
  nodes.update(n => n.filter(node => node.id !== id));
  connections.update(c => c.filter(conn => !conn.from.startsWith(id) && !conn.to.startsWith(id)));
}

export function addConnection(from: string, to: string) {
  connections.update(c => [...c, { from, to }]);
}

export function removeConnection(from: string, to: string) {
  connections.update(c => c.filter(conn => conn.from !== from || conn.to !== to));
}
