import React from 'react'

export const addLinks = (content) => {
    const regex = /((https?:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g;
    const result = [];
    let match;
    let startIndex = 0;

    do {
        match = regex.exec(content);

        if (!match) {
            result.push(content.slice(startIndex));
            break;
        }

        result.push(content.slice(startIndex, match.index));
        result.push(<a href={match[0]}>{match[0]}</a>);
        startIndex = match.index + match[0].length;
    } while (match);

    return result;
};

export const extractTags = (message) => {
    const matches = message.match(/\[(.*?)\]/gi) || [];

    const tags = matches
        .map((tag) => tag.replace('[', '').replace(']', ''))
        .filter((x) => x.length < 15);

    let content = message;
    // remove tags from content
    content = content.replace(
        new RegExp(matches.map((tag) => `\\${tag}`).join('|'), 'gi'),
        '',
    );
    // remove leading whitespace and newlines
    content = content.replace(/^\s+\n+/gi, '');

    return [tags, content];
};
