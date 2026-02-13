import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { branchConfig } from "../../config/branchConfig";

describe("Footer Component", () => {
  it("should render branch1 information correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText(branchConfig.branch1.name)).toBeInTheDocument();
    expect(screen.getByText(branchConfig.branch1.address)).toBeInTheDocument();
    expect(screen.getByText(branchConfig.branch1.phone)).toBeInTheDocument();
  });

  it("should render branch2 information correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText(branchConfig.branch2.name)).toBeInTheDocument();
    expect(screen.getByText(branchConfig.branch2.address)).toBeInTheDocument();
    expect(screen.getByText(branchConfig.branch2.phone)).toBeInTheDocument();
  });

  it("should have correct map links for both branches", () => {
    render(<Footer />);
    
    const branch1Link = screen.getByText(branchConfig.branch1.address).closest("a");
    const branch2Link = screen.getByText(branchConfig.branch2.address).closest("a");
    
    expect(branch1Link).toHaveAttribute("href", branchConfig.branch1.mapLink);
    expect(branch2Link).toHaveAttribute("href", branchConfig.branch2.mapLink);
  });

  it("should display location names instead of 'Branch 1' and 'Branch 2'", () => {
    render(<Footer />);
    
    // Should NOT contain "Branch 1" or "Branch 2"
    expect(screen.queryByText("Branch 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Branch 2")).not.toBeInTheDocument();
    
    // Should contain location names
    expect(screen.getByText(branchConfig.branch1.name)).toBeInTheDocument();
    expect(screen.getByText(branchConfig.branch2.name)).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(<Footer />);
    
    expect(screen.getByText(/Let's keep in touch!/i)).toBeInTheDocument();
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });
});
