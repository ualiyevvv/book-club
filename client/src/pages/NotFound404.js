import React from "react";
import AppContainer from "./business_client/AppContainer";
import Typography from "../shared/ui/typography/Typography";

export default function NotFound404() {
    return(<AppContainer isBoxCentered={true} isHorizontalCenter={true}>
        <Typography size={28} weight={700}>404 Page Not Found</Typography>
    </AppContainer>)
}