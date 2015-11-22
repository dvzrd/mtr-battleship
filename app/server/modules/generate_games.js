let generate = () => {
    let gamesCount = 5,
        gamesExist = _checkIfGamesExist(gamesCount);

    if (!gamesExist) {
        _createGames(_generateGames(gamesCount));
    }
};

let _checkIfGamesExist = (count) => {
    let gamesCount = Games.find().count();
    return gamesCount < count ? false : true;
};

let _createGames = (games) => {
    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        _createGame(game);
    }
};

let _checkIfUserExists = (email) => {
    return Meteor.users.findOne({'emails.address': email});
};

let _createGame = (game) => {
    Games.insert(game);
};

let _generateGames = (count) => {
    let games = [];

    for (let i = 0; i < count; i++) {
        games.push({
            title: 'Game Title',
            creator: 'admin',
            playerCount: 0,
            createdAt: new Date()
        });
    }

    return games;
};

Modules.server.generateGames = generate;