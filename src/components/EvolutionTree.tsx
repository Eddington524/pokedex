import { Chain } from '../recoil/pokemon';

type TreeNodeProps = {
	name: string;
	evolvesTo: Chain[];
};
const TreeNode: React.FC<TreeNodeProps> = ({ name, evolvesTo }) => (
	<div style={{ marginLeft: '20px' }}>
		<div style={{ marginLeft: '20px' }}>
			{evolvesTo.map((evolution, index) => (
				<TreeNode
					key={index}
					name={evolution.species.name}
					evolvesTo={evolution.evolves_to}
				/>
			))}
		</div>
		<div>{name}</div>
	</div>
);

type EvolutionTreeProps = {
	chain: Chain;
};

const EvolutionTree: React.FC<EvolutionTreeProps> = ({ chain }) => {
	const drawTree = (chain: Chain) => (
		<TreeNode name={chain.species.name} evolvesTo={chain.evolves_to} />
	);

	return <div>{drawTree(chain)}</div>;
};

export default EvolutionTree;
