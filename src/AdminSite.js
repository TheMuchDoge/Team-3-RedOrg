import React from "react";
import EventGodkjenning from './EvtGodkjening';
import BrukerGodkjenning from "./brukerGodkjenning";


class AdminSite extends React.Component {
    render() {

        return (
            <div>
                <EventGodkjenning></EventGodkjenning>
                <BrukerGodkjenning/>
            </div>
        )
    }



}

export default AdminSite;