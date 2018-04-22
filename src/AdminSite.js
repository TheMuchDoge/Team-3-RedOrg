import React from "react";
// Importer to komponenter fra andre filer.
import EventGodkjenning from './EvtGodkjening';
import BrukerGodkjenning from "./brukerGodkjenning";


class AdminSite extends React.Component {
    render() {

        return (
            // Skriver de ut her.
            <div>
                <EventGodkjenning/>
                <BrukerGodkjenning/>

            </div>
        )
    }



}

export default AdminSite;