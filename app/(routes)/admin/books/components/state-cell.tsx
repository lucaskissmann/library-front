interface StateCellProps {
	state: string;
}

const StateCell: React.FC<StateCellProps> = ({ state }) => {
	return (
		<div className="flex items-center justify-start gap-2">
			<div className={`w-2 h-2 ${state === 'AVAILABLE' ? `bg-[#52C41A]` : `bg-[#D9D9D9]`} rounded-full`}></div>
			<span>
				{state == "AVAILABLE" ? "Disponível" : "Alugado"}
			</span>
		</div>
	);
}

export default StateCell;