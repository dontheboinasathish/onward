import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "./Counter";

//test block
test("increments counter", () => {

// render the component on virtual dom

render(<Counter />);

//select the elements you want to interact with
const counter = screen.getByTestId("counter");
const incrementBtn = screen.getByTestId("increment");
 const counter1=screen.getByTestId("decrementpara")
 const decrementbtn=screen.getByTestId("decrement")


//interact with those elements
fireEvent.click(incrementBtn);
fireEvent.click(decrementbtn)


//assert the expected result
expect(counter).toHaveTextContent("1");
expect(counter1).toHaveTextContent("1");
});