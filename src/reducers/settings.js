let locale = localStorage.getItem('locale');
if (!locale) {
  locale = 'en-US'
}
export default (state = { locale: locale, isOffline: !navigator.onLine }, action) => {
  switch (action.type) {
    case 'IS_OFFLINE':
      return {
        ...state,
        isOffline: action.payload.isOffline
      }

    default:
      return state;
  }
};