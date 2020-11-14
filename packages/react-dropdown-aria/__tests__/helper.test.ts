import { DropdownTheme, RdaThemeType } from "../styles";
import { mergeThemes, unpackTheme } from "../utils/helper";

describe('Merge themes', () => {
  it('Should properly merge plain theme objects', () => {
    const custom: RdaThemeType = {
      wrapper: {
        backgroundColor: '#FFFFFF',
        display: 'none',
      },
    };
    const res = mergeThemes(custom, DropdownTheme);

    expect(res).toEqual({
      ...DropdownTheme,
      wrapper: {
        ...DropdownTheme.wrapper,
        ...custom.wrapper,
      } as any
    });
  });

  it('Should properly merge functional theme objects', () => {
    const custom: RdaThemeType = {
      wrapper: (props) => ({
        backgroundColor: props.disabled ? 'red' : '#FFFFFF',
        display: 'none',
      }),
      optionItem: {
        color: ({ selected }) => selected ? 'green' : 'black',
        cursor: ({ selected }) => selected ? 'inherit' : 'pointer',
      }
    };
    const res = mergeThemes(custom, DropdownTheme);

    expect(res).toEqual({
      ...DropdownTheme,
      wrapper: [custom.wrapper, DropdownTheme.wrapper],
      optionItem: {
        ...DropdownTheme.optionItem,
        ...custom.optionItem,
        color: [(custom.optionItem as any).color, (DropdownTheme.optionItem as any).color],
      } as any
    });
  });
});

describe('Unpack themes', () => {
  it('Should properly unpack plain custom theme', () => {
    const custom: RdaThemeType = {
      wrapper: {
        backgroundColor: '#FFFFFF',
        display: 'none',
      },
    };

    const merged = mergeThemes(custom, DropdownTheme);
    const unpacked = unpackTheme(merged.wrapper!, { width: 10, height: 10, disabled: false, open: false, dropdownFocused: false });

    expect(unpacked.backgroundColor).toBe('#FFFFFF');
    expect(unpacked.display).toBe('none');
  });

  it('should properly unpack function themes', () => {
    const custom: RdaThemeType = {
      wrapper: (props) => ({
        backgroundColor: props.disabled ? 'red' : '#FFFFFF',
        display: 'none',

        '&:hover': (props) => ({
          color: 'blue',
          cursor: props.disabled ? 'not-allowed' : 'pointer',
        })
      }),
      optionItem: {
        color: ({ selected }) => selected ? 'green' : 'black',
        cursor: ({ selected }) => selected ? 'inherit' : 'pointer',
      },
      arrow: {
        color: 'black',
        '&:hover': {
          cursor: 'all-scroll',
          color: () => 'blue'
        }
      }
    };
    const merged = mergeThemes(custom, DropdownTheme);
    const wrapperProps = { width: 10, height: 10, disabled: false, open: false, dropdownFocused: false };
    const unpackedWrapper = unpackTheme(merged.wrapper!, wrapperProps);
    const unpackedOptionItem = unpackTheme(merged.optionItem!, { selected: false, focused: false });
    const arrowWrapper = unpackTheme(merged.arrow!, { open: false });

    expect(unpackedWrapper.backgroundColor).toBe('#FFFFFF');
    expect(unpackedWrapper.display).toBe('none');
    expect(unpackedWrapper['&:hover']).toStrictEqual({
      color: 'blue',
      cursor: 'pointer',
    });

    expect(unpackedOptionItem.color).toBe('black');
    expect(unpackedOptionItem.cursor).toBe('pointer');

    expect(arrowWrapper.color).toBe('black');
    expect(arrowWrapper['&:hover']).toStrictEqual({
      cursor: 'all-scroll',
      color: 'blue',
    });
  });
});
