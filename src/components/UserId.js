import Cookies from 'js-cookie'

const acPerm = Cookies.get("acPerm")
export const userId = acPerm? acPerm.split('|')[0]: null
