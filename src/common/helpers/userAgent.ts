import UAParser from 'ua-parser-js';
export const isMobile = () => {
  const parser = new UAParser();
  const {
    device: { type },
  } = parser.getResult();

  return type === 'mobile' || type === 'tablet';
};
