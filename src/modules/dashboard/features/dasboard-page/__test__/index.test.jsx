import User from "../index";
import { render } from "@testing-library/react";

it("should be render ", () => {
  const { container } = render(<User />);
  expect(container.tagName).toBe("DIV");
});
