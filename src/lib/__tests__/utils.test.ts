import { capitalize } from '@/lib/utils';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('glidis')).toBe('Glidis');
    expect(capitalize('o vol')).toBe('O vol');
  });

  it('should handle empty strings & null & undefined', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize(null)).toBe('');
    expect(capitalize(undefined)).toBe('');
  });

  it('should handle strings with leading spaces', () => {
    expect(capitalize(' glidis')).toBe('Glidis');
  });

  it('should handle strings with special characters && number', () => {
    expect(capitalize('!glidis')).toBe('!glidis');
    expect(capitalize('@o vol')).toBe('@o vol');
    expect(capitalize('123glidis')).toBe('123glidis');
    expect(capitalize('1o vol')).toBe('1o vol');
  });

  it('should handle strings with hyphens', () => {
    expect(capitalize('-glidis')).toBe('-glidis');
    expect(capitalize('-o vol')).toBe('-o vol');
  });
});
