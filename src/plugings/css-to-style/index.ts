// Source - https://github.com/jacobbuck/css-to-style

import { camelCase, startsWith, toLower, trim } from 'lodash';

type CSSProperties = Record<string, string>;

/**
 * Converts a CSS property name to a JS-style property name.
 */
const convertPropertyName = (prop: string): string => {
  const lowerProp = toLower(prop);
  if (lowerProp === 'float') {
    return 'cssFloat';
  }
  if (startsWith(lowerProp, '--')) {
    return lowerProp; // CSS variables remain unchanged
  }
  if (startsWith(lowerProp, '-ms-')) {
    return camelCase(lowerProp.slice(1));
  }

  return camelCase(lowerProp);
};

/**
 * Splits a CSS string into declarations, handling quotes and parentheses.
 */
const splitDeclarations = (cssText: string): string[] => {
  const declarations: string[] = [];
  let capturing: string | false = false;
  let buffer = '';

  for (let i = 0; i < cssText.length; i++) {
    const char = cssText[i];
    const prevChar = cssText[i - 1];

    // Handle quotes (ignore escaped quotes)
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      capturing = capturing ? (capturing === char ? false : capturing) : char;
    }

    // Handle parentheses
    if (!capturing && char === '(') {
      capturing = ')';
    } else if (capturing === ')' && char === ')') {
      capturing = false;
    }

    // Split at semicolon when not in quotes/parentheses
    if (char === ';' && !capturing) {
      declarations.push(trim(buffer));
      buffer = '';
    } else {
      buffer += char;
    }
  }

  if (buffer) {
    declarations.push(trim(buffer));
  }

  return declarations.filter(Boolean);
};

/**
 * Splits a CSS declaration into property and value.
 */
const splitDeclaration = (declaration: string): [string, string] | null => {
  const index = declaration.indexOf(':');
  if (index === -1) return null; // Skip invalid declarations

  const name = trim(declaration.slice(0, index));
  const value = trim(declaration.slice(index + 1));

  return name && value ? [name, value] : null;
};

/**
 * Converts a CSS string into a JavaScript style object.
 */
const cssToStyle = (cssText: string): CSSProperties => {
  return splitDeclarations(cssText)
    .map(splitDeclaration)
    .reduce<CSSProperties>((styles, declaration) => {
      if (declaration) {
        const [name, value] = declaration;
        styles[convertPropertyName(name)] = value;
      }
      return styles;
    }, {});
};

export default cssToStyle;
