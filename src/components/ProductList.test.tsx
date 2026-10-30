import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProductList from "./ProductList";
function names() {
  return screen.queryAllByRole("rowheader").map((cell) => cell.textContent);
}
function setup() {
  render(<ProductList />);
  return userEvent.setup();
}
describe("Product catalog", () => {
  it("renders all five products with USD prices and stock status", () => {
    setup();
    expect(names()).toEqual([
      "Wireless Mouse",
      "Mechanical Keyboard",
      "4K Monitor",
      "USB C Hub",
      "Laptop Stand",
    ]);
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getAllByText("Out of stock")).toHaveLength(2);
    expect(screen.getByRole("status")).toHaveTextContent("5 of 5 products");
  });
  it("searches immediately and case-sensitively", async () => {
    const user = setup();
    const search = screen.getByRole("searchbox", { name: "Search products" });
    await user.type(search, "Mouse");
    expect(names()).toEqual(["Wireless Mouse"]);
    await user.clear(search);
    await user.type(search, "mouse");
    expect(names()).toEqual([]);
  });
  it("filters by category", async () => {
    const user = setup();
    await user.selectOptions(screen.getByLabelText("Category"), "Displays");
    expect(names()).toEqual(["4K Monitor"]);
    await user.selectOptions(screen.getByLabelText("Category"), "Accessories");
    expect(names()).toHaveLength(4);
  });
  it("shows only available products when requested", async () => {
    const user = setup();
    await user.click(screen.getByLabelText("In stock only"));
    expect(names()).toEqual(["Wireless Mouse", "4K Monitor", "USB C Hub"]);
  });
  it("combines search, category, and stock filters", async () => {
    const user = setup();
    await user.type(screen.getByRole("searchbox"), "o");
    await user.selectOptions(screen.getByLabelText("Category"), "Accessories");
    expect(names()).toEqual([
      "Wireless Mouse",
      "Mechanical Keyboard",
      "Laptop Stand",
    ]);
    await user.click(screen.getByLabelText("In stock only"));
    expect(names()).toEqual(["Wireless Mouse"]);
  });
  it("sorts prices in both directions and restores original order", async () => {
    const user = setup();
    const sort = screen.getByLabelText("Sort by");
    await user.selectOptions(sort, "price-asc");
    expect(names()).toEqual([
      "Wireless Mouse",
      "USB C Hub",
      "Laptop Stand",
      "Mechanical Keyboard",
      "4K Monitor",
    ]);
    await user.selectOptions(sort, "price-desc");
    expect(names()).toEqual([
      "4K Monitor",
      "Mechanical Keyboard",
      "Laptop Stand",
      "USB C Hub",
      "Wireless Mouse",
    ]);
    await user.selectOptions(sort, "default");
    expect(names()).toEqual([
      "Wireless Mouse",
      "Mechanical Keyboard",
      "4K Monitor",
      "USB C Hub",
      "Laptop Stand",
    ]);
  });
  it("shows a friendly empty state and recovers through its clear action", async () => {
    const user = setup();
    await user.type(screen.getByRole("searchbox"), "missing");
    expect(
      screen.getByRole("heading", { name: "No products found" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear all filters" }));
    expect(names()).toHaveLength(5);
    expect(screen.queryByText("No products found")).not.toBeInTheDocument();
  });
  it("clears every control and restores the original products", async () => {
    const user = setup();
    await user.type(screen.getByRole("searchbox"), "Mouse");
    await user.selectOptions(screen.getByLabelText("Category"), "Accessories");
    await user.click(screen.getByLabelText("In stock only"));
    await user.selectOptions(screen.getByLabelText("Sort by"), "price-desc");
    await user.click(
      screen.getByRole("button", { name: "Clear filters" }),
    );
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByLabelText("Category")).toHaveValue("");
    expect(screen.getByLabelText("In stock only")).not.toBeChecked();
    expect(screen.getByLabelText("Sort by")).toHaveValue("default");
    expect(names()).toHaveLength(5);
    expect(
      within(screen.getAllByRole("row")[1]).getByRole("rowheader"),
    ).toHaveTextContent("Wireless Mouse");
  });
});
