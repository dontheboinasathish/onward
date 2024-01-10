import React from "react";
import Toasts from "./Toasts";
import axios from "axios";
import { render } from "@testing-library/react";

jest.mock(axios)


describe('render the compoent',()=>{
    render(<Toasts/>)
})


