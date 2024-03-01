import React from "react";
import { render, screen } from "@testing-library/react";

import InvetoryEditDialogComponent from "../InvetoryEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders invetory edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InvetoryEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("invetory-edit-dialog-component")).toBeInTheDocument();
});
