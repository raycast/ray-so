import React from 'react';

/**
 * Safely renders prompt content by parsing placeholders without using dangerouslySetInnerHTML
 * This prevents XSS attacks while maintaining the placeholder styling functionality
 *
 * @param content - The prompt content to render
 * @param placeholderClassName - CSS class name for placeholder styling
 * @returns Array of React nodes with safely rendered content
 */
export function renderSafePromptContent(content: string, placeholderClassName: string = 'placeholder'): React.ReactNode[] {
  // Split content by placeholder pattern but preserve the placeholders
  const parts = content.split(/(\{[^}]+\})/);

  return parts.map((part, index) => {
    // Check if this part matches the placeholder pattern
    const isPlaceholder = /^\{[^}]+\}$/.test(part);

    if (isPlaceholder) {
      return (
        <span key={index} className={placeholderClassName}>
          {part}
        </span>
      );
    } else {
      // For regular text, React will automatically escape HTML entities
      // This prevents XSS while preserving text content
      return part;
    }
  });
}

/**
 * Validates and sanitizes prompt data from URL parameters
 * Ensures the prompt object contains only expected safe properties
 *
 * @param promptData - Raw prompt data from URL parameter
 * @returns Sanitized prompt object or null if invalid
 */
export function validatePromptData(promptData: any): any | null {
  if (!promptData || typeof promptData !== 'object') {
    return null;
  }

  // Whitelist of allowed properties and their expected types
  const allowedProperties = {
    title: 'string',
    prompt: 'string',
    creativity: 'string',
    icon: 'string',
    model: 'string',
    highlightEdits: 'boolean'
  };

  const sanitized: any = {};

  // Only include whitelisted properties with correct types
  Object.keys(allowedProperties).forEach(key => {
    if (key in promptData) {
      const expectedType = allowedProperties[key as keyof typeof allowedProperties];
      const value = promptData[key];

      if (typeof value === expectedType) {
        // Additional validation for string properties to prevent overly long content
        if (expectedType === 'string' && typeof value === 'string') {
          // Limit string length to prevent DoS attacks
          sanitized[key] = value.slice(0, 10000);
        } else {
          sanitized[key] = value;
        }
      }
    }
  });

  // Ensure required properties exist
  if (!sanitized.title || !sanitized.prompt) {
    return null;
  }

  return sanitized;
}
