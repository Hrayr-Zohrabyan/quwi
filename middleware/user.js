export default ({store, redirect}) => {
  if (store.$cookies.get('access_token')) {
  	return redirect('/home');
  }
}