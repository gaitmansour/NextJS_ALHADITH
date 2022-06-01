import FetchAPI from '../API'
import { handleMenu } from '../helpers'
import { getMenu } from '../endpoints'

const url = getMenu()

export const getMenuList = async () => {
  return FetchAPI(url).then((data) => {
    // console.log('menu---------------------',url)
    if (data.success) {
      return handleMenu(data?.data)
    }
  })
}
