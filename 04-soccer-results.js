/**
 * Created by Strahil on 11/12/14.
 */
'use strict';

var sampleData = [
    'Germany / Argentina: 1-0',
    'Brazil / Netherlands: 0-3',
    'Netherlands / Argentina: 0-0',
    'Brazil / Germany: 1-7',
    'Argentina / Belgium: 1-0',
    'Netherlands / Costa Rica: 0-0',
    'France / Germany: 0-1',
    'Brazil / Colombia: 2-1',
];

aggregateResults(sampleData);

function aggregateResults(scores) {
    var teamResults = {};
    var regEx = /(.*)\s*\/\s*(.*)\s*:\s*(\d{1,2})\s*-\s*(\d{1,2})/i;
    for (var i = 0; i < scores.length; i++) {
        var match = regEx.exec(scores[i]);
        var homeTeam = match[1].trim();
        var awayTeam = match[2].trim();
        var homeTeamGoals = Number(match[3].trim());
        var awayTeamGoals = Number(match[4].trim());

        if (!teamResults[homeTeam]) {
            var teamsAgainst = [];
            teamsAgainst.push(awayTeam);
            var teamData = {
              goalsScored:homeTeamGoals,
              goalsConceded:awayTeamGoals,
              matchesPlayedWith: teamsAgainst
            };
            teamResults[homeTeam] = teamData;
        } else {
            teamResults[homeTeam].goalsScored = teamResults[homeTeam].goalsScored + homeTeamGoals;
            teamResults[homeTeam].goalsConceded = teamResults[homeTeam].goalsConceded + awayTeamGoals;
            if (teamResults[homeTeam].matchesPlayedWith.indexOf(awayTeam) == -1) {
                teamResults[homeTeam].matchesPlayedWith.push(awayTeam);
            }
        }

        if (!teamResults[awayTeam]) {
            var teamsAgainst = [];
            teamsAgainst.push(homeTeam);
            var teamData = {
                goalsScored:awayTeamGoals,
                goalsConceded:homeTeamGoals,
                matchesPlayedWith: teamsAgainst
            };
            teamResults[awayTeam] = teamData;
        } else {
            teamResults[awayTeam].goalsScored = teamResults[awayTeam].goalsScored + awayTeamGoals;
            teamResults[awayTeam].goalsConceded = teamResults[awayTeam].goalsConceded + homeTeamGoals;
            if (teamResults[awayTeam].matchesPlayedWith.indexOf(homeTeam) == -1) {
                teamResults[awayTeam].matchesPlayedWith.push(homeTeam);
            }
        }
    }
    teamResults = sortObjectProperties(teamResults);
    for (var team in teamResults) {
        teamResults[team].matchesPlayedWith.sort();
    }

    console.log(JSON.stringify(teamResults));

    function sortObjectProperties(obj) {
        var keysSorted = Object.keys(obj).sort();
        var sortedObj = {};
        for (var i = 0; i < keysSorted.length; i++) {
            var key = keysSorted[i];
            sortedObj[key] = obj[key];
        }
        return sortedObj;
    }
}