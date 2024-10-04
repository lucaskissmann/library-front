import SideBarButton from "@/app/(routes)/admin/components/sidebar-button";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("SideBarButton", () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue("/current-path");
  });

  it("should render the button with the correct label", () => {
    render(<SideBarButton label="Dashboard" href="/dashboard" />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it("should call router.push with the correct href when clicked", () => {
    render(<SideBarButton label="Dashboard" href="/dashboard" />);

    const button = screen.getByText(/dashboard/i);
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should not apply the active class when current route does not match href", () => {
    mockUsePathname.mockReturnValue("/other-path");

    render(<SideBarButton label="Dashboard" href="/dashboard" />);

    const button = screen.getByText(/dashboard/i);
    expect(button).not.toHaveClass("bg-[#0000001F]");
  });
});
