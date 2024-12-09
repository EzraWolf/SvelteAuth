<script lang="ts">
  import { T } from '@threlte/core';
  import { nodes } from '../stores/nodeStore';
  import Node from './Node.svelte';

  function getNodeById(id: string) {
    return $nodes.find(node => node.id === id);
  }
</script>

<T.Group>
  {#each $nodes as node (node.id)}
    <Node {node} />
  {/each}
</T.Group>
