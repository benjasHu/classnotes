export const fluidStyle = (
	max,
	min,
	prop = 'font-size',
	unit = 'px',
	maxVw = 1200,
	minVw = 580
) => {
	return `
    ${prop}: ${min}${unit};

    @media screen and (min-width: ${minVw + unit}) {
      ${prop}: calc(${min + unit} + (${max} - ${min}) * ((100vw - ${
		minVw + unit
	}) / (${maxVw} - ${minVw})));
    }

    @media screen and (min-width: ${maxVw + unit}) {
      ${prop}: ${max + unit};
    }
  `
}
