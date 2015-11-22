let startup = () => {
    _generateAccounts();
    _generateGames();
};

var _generateAccounts = () => Modules.server.generateAccounts();

let _generateGames = () => Modules.server.generateGames();

Modules.server.startup = startup;