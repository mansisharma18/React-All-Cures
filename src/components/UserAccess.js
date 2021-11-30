import Cookies from 'js-cookie'

const acPerm = Cookies.get("acPerm")
export const userAccess = acPerm? acPerm.split('|')[1]: null
