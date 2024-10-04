import { render, screen } from "@testing-library/react";
import DownloadApp from "../download-app";

describe("DownloadApp Component", () => {
  beforeEach(() => {
    render(<DownloadApp />);
  });

  it("should render the download message", () => {
    const message = screen.getByText(/faça o download gratuito de nossos aplicativos/i);
    expect(message).toBeInTheDocument();
  });

  it("should render app store and google play images", () => {
    const appStoreImage = screen.getByAltText(/imagem do download na appstore/i);
    const googlePlayImage = screen.getByAltText(/imagem do download no googleplay/i);
    
    expect(appStoreImage).toBeInTheDocument();
    expect(googlePlayImage).toBeInTheDocument();
  });

  it("should have correct image src attributes", () => {
    const appStoreImage = screen.getByAltText(/imagem do download na appstore/i);
    const googlePlayImage = screen.getByAltText(/imagem do download no googleplay/i);
    
    expect(appStoreImage).toBeInTheDocument();
    expect(googlePlayImage).toBeInTheDocument();
  });
});
