import React from "react";

const Context = React.createContext({
    is_admin: 0,
    tasks_per_page: 0
});

export default Context;