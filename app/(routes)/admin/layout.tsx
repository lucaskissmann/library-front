import SideBar from "./components/sidebar";

export default async function AdminLayout ({
	children,
} : {
	children: React.ReactNode;
}) {
	return(
		<div className="flex">
			<SideBar />
			<div className="ml-[256px] w-full">
				{children}
			</div>
		</div>
	)
}