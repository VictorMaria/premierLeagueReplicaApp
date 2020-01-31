import gravatar from 'gravatar';
 
const avatarFetcher = (gravatarEmail) => gravatar.url(gravatarEmail.toLowerCase(), {
  s: '200',
  r: 'pg',
  d: 'mm',
});
 
export default avatarFetcher;