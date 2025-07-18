import { useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

export const OneDarkProTheme = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: '', foreground: 'abb2bf', background: '282c34' },
        { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c678dd' },
        { token: 'number', foreground: 'd19a66' },
        { token: 'string', foreground: '98c379' },
        { token: 'operator', foreground: '56b6c2' },
        { token: 'function', foreground: '61afef' },
        { token: 'type', foreground: 'e5c07b' },
    ],
    colors: {
        'editor.foreground': '#abb2bf',
        'editor.background': '#282c34',
        'editorCursor.foreground': '#528bff',
        'editor.lineHighlightBackground': '#2c313c',
        'editorLineNumber.foreground': '#636d83',
        'editor.selectionBackground': '#3e4451',
        'editor.inactiveSelectionBackground': '#3e445199',
    }
};


export const OneDarkProNightFlatTheme = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: '', foreground: 'dcdcdc', background: '1e1e1e' },
        { token: 'comment', foreground: '608b4e', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c586c0' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'operator', foreground: 'd4d4d4' },
        { token: 'function', foreground: 'dcdcaa' },
        { token: 'type', foreground: '4ec9b0' },
        { token: 'identifier', foreground: '9cdcfe' },

        // 🎯 Bracket colors
        { token: 'delimiter.bracket', foreground: 'ffd700' }, // gold
        { token: 'delimiter.parenthesis', foreground: 'ffa07a' }, // light salmon
        { token: 'delimiter.square', foreground: '00bfff' }, // deep sky blue
        { token: 'delimiter.curly', foreground: '7fffd4' }, // aquamarine
    ],



    colors: {
        'editor.foreground': '#dcdcdc',
        'editor.background': '#1e1e1e',
        'editorCursor.foreground': '#aeafad',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',

        // 🟩 Nesting bracket colors
        'editorBracketHighlight.foreground1': '#ff5555', // red
        'editorBracketHighlight.foreground2': '#f1fa8c', // yellow
        'editorBracketHighlight.foreground3': '#50fa7b', // green
        'editorBracketHighlight.foreground4': '#8be9fd', // cyan
        'editorBracketHighlight.foreground5': '#bd93f9', // purple
        'editorBracketHighlight.foreground6': '#ff79c6', // pink
        'editorBracketHighlight.unexpectedBracket.foreground': '#ff6e6e', // mismatch
    },
};
