import lighten from 'polished/lib/color/lighten';
import darken from 'polished/lib/color/darken';
// import shade from 'polished/lib/color/shade';

export const orange = '#ff6f55';
export const darkOrange = darken(0.2, orange);
export const lightOrange = lighten(0.2, orange);

export const gray = '#bdc3c7';
export const darkGray = darken(0.2, gray);

export const white = '#ffffff';
export const offWhite = '#F5F7FA';
export const darkOffWhite = darken(0.05, offWhite);

export const black = 'rgba(66,66,66,.95)';

export const secondaryMenu = lighten(0.15, gray);