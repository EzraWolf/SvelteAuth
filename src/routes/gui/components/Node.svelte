<script lang="ts">
	import { T } from '@threlte/core';
	import type { BaseNode } from '../nodes/BaseNode';

	export let node: BaseNode;

	const width = 2;
	const height = 1;
</script>

<T.Group position={[node.position.x, node.position.y, node.position.z]}>
	<T.Mesh>
		<T.BoxGeometry args={[width, height, 0.1]} />
		<T.MeshStandardMaterial color="gray" />
	</T.Mesh>
	<T.Sprite scale={[0.5, 0.25, 1]} position={[0, 0, 0.1]}>
		<T.SpriteMaterial>
			<T.CanvasTexture>
				<canvas width="200" height="100">
					<span style="font-size: 24px; color: white;">{node.name}</span>
				</canvas>
			</T.CanvasTexture>
		</T.SpriteMaterial>
	</T.Sprite>
</T.Group>
